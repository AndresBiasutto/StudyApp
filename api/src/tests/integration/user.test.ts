import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';

jest.mock('../../repositories/user.repository');
jest.mock('../../utils/hashPassword');
jest.mock('../../utils/sendVerificationEmail');
jest.mock('../../utils/comparePassword');
jest.mock('jsonwebtoken');
jest.mock('google-auth-library');

describe('User API Integration Tests', () => {
  const validToken = jwt.sign({ id_user: 'user-123' }, 'test-secret');

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'John',
          last_name: 'Doe',
          e_mail: 'new@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return 400 if email already exists', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'John',
          e_mail: 'existing@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/users/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          e_mail: 'test@test.com',
          password: 'correctPassword',
        });

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });

    it('should return 400 with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          e_mail: 'notfound@test.com',
          password: 'wrongPassword',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/users/me', () => {
    it('should return 401 without token', async () => {
      const response = await request(app).get('/api/users/me');

      expect(response.status).toBe(401);
    });

    it('should return user data with valid token', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users');

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });
  });

  describe('GET /api/users/liData', () => {
    it('should return users with limited data', async () => {
      const response = await request(app).get('/api/users/liData');

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });
  });

  describe('GET /api/users/liDataTeachers', () => {
    it('should return teachers with limited data', async () => {
      const response = await request(app).get('/api/users/liDataTeachers');

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });
  });

  describe('DELETE /api/users/:id_user', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete('/api/users/user-123');

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(400);
    });
  });
});

describe('Health Check', () => {
  describe('GET /api (root)', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown');

      expect(response.status).toBe(404);
    });
  });
});
