import userService from '../services/user.service';
import userRepository from '../repositories/user.repository';
import * as jwt from 'jsonwebtoken';
import hashPassword from '../utils/hashPassword';
import sendVerificationEmail from '../utils/sendVerificationEmail';

jest.mock('../repositories/user.repository');
jest.mock('../utils/hashPassword');
jest.mock('../utils/sendVerificationEmail');
jest.mock('jsonwebtoken');
jest.mock('google-auth-library');

describe('UserService', () => {
  const mockRepository = userRepository as jest.Mocked<typeof userRepository>;
  const mockSendVerificationEmail =
    sendVerificationEmail as jest.MockedFunction<typeof sendVerificationEmail>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should create user if email does not exist', async () => {
      mockRepository.registerUser = jest.fn().mockResolvedValue({
        id_user: 'new-id',
        name: 'John',
        e_mail: 'new@test.com',
      });
      (hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      mockSendVerificationEmail.mockResolvedValue(undefined);

      const newUser = {
        name: 'John',
        last_name: 'Doe',
        e_mail: 'new@test.com',
        password: 'password123',
      };

      const result = await userService.registerUser(newUser);
      
      expect(mockRepository.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          e_mail: 'new@test.com',
          password: 'hashedPassword',
        }),
      );
      expect(mockSendVerificationEmail).toHaveBeenCalledWith(
        'new@test.com',
        expect.any(String),
      );
      expect(result).toBeDefined();
    });
  });

  describe('loginUser', () => {
    it('should throw error if user not found', async () => {
      mockRepository.getUserByEmail = jest.fn().mockResolvedValue(null);

      const loginData = { e_mail: 'notfound@test.com', password: 'password' };

      // El código actual tiene un bug: no maneja null correctamente
      // Espera a que se arregle el código para que este test pase
      await expect(userService.loginUser(loginData)).rejects.toThrow();
    });

    it('should return token if credentials are valid', async () => {
      const mockUser = {
        id_user: 'user-123',
        name: 'John',
        last_name: 'Doe',
        e_mail: 'test@test.com',
        password: 'hashedPassword',
        image: null,
        contactNumber: null,
        description: null,
        Role: { id_role: '1', name: 'student' },
      };

      mockRepository.getUserByEmail = jest.fn().mockResolvedValue(mockUser);
      mockRepository.getUser = jest.fn().mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      const loginData = { e_mail: 'test@test.com', password: 'correctPassword' };

      const result = await userService.loginUser(loginData);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('id_user');
    });
  });

  describe('getMe', () => {
    it('should return user by id', async () => {
      const mockUser = {
        id_user: 'user-123',
        name: 'John',
        last_name: 'Doe',
        e_mail: 'john@test.com',
        id_role: 'role-1',
        contact_number: null,
        description: null,
        image: null,
        Role: { id_role: 'role-1', name: 'student' },
        createdSubjects: [],
        enrolledSubjects: [],
      };
      mockRepository.getUser = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.getMe('user-123');

      expect(mockRepository.getUser).toHaveBeenCalledWith('user-123');
      expect(result).toEqual({
        id_user: 'user-123',
        name: 'John',
        last_name: 'Doe',
        e_mail: 'john@test.com',
        image: null,
        Role: { id_role: 'role-1', name: 'student' },
        contact_number: null,
        description: null,
        id_role: 'role-1',
        subjects: [],
        enrolledSubjects: [],
      });
    });
  });

  describe('deleteUser', () => {
    it('should return true if user is deleted', async () => {
      mockRepository.deleteUser = jest.fn().mockResolvedValue(1);

      const result = await userService.deleteUser('user-123');

      expect(mockRepository.deleteUser).toHaveBeenCalledWith('user-123');
      expect(result).toBe(true);
    });

    it('should throw error if user not found', async () => {
      mockRepository.deleteUser = jest.fn().mockResolvedValue(0);

      await expect(userService.deleteUser('non-existent')).rejects.toThrow('User not found');
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id_user: '2',
          name: 'Zoe',
          last_name: 'B',
          e_mail: 'zoe@test.com',
          contact_number: null,
          description: null,
          image: null,
          id_role: 'role-1',
          Role: { id_role: 'role-1', name: 'student' },
          createdSubjects: [],
          enrolledSubjects: [],
        },
        {
          id_user: '1',
          name: 'Ana',
          last_name: 'A',
          e_mail: 'ana@test.com',
          contact_number: null,
          description: null,
          image: null,
          id_role: 'role-1',
          Role: { id_role: 'role-1', name: 'student' },
          createdSubjects: [],
          enrolledSubjects: [],
        },
      ];
      mockRepository.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(mockRepository.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([
        expect.objectContaining({ id_user: '1', name: 'Ana' }),
        expect.objectContaining({ id_user: '2', name: 'Zoe' }),
      ]);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const mockUser = { id_user: '1', e_mail: 'test@test.com' };
      mockRepository.getUserByEmail = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.getUserByEmail('test@test.com');

      expect(mockRepository.getUserByEmail).toHaveBeenCalledWith('test@test.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update user and return updated user', async () => {
      const updatedUser = {
        id_user: 'user-123',
        name: 'Jane',
        last_name: 'Doe',
        e_mail: 'jane@test.com',
        image: null,
        contact_number: null,
        Role: { id_role: 'role-1', name: 'student' },
      };
      mockRepository.updateUser = jest.fn().mockResolvedValue(updatedUser);

      const result = await userService.updateUser('user-123', { name: 'Jane' });

      expect(mockRepository.updateUser).toHaveBeenCalledWith('user-123', { name: 'Jane' });
      expect(result).toEqual({
        id_user: 'user-123',
        name: 'Jane',
        last_name: 'Doe',
        e_mail: 'jane@test.com',
        image: null,
        Role: { id_role: 'role-1', name: 'student' },
        contact_number: null,
      });
    });

    it('should throw error if user not found', async () => {
      mockRepository.updateUser = jest.fn().mockResolvedValue(null);

      await expect(userService.updateUser('non-existent', { name: 'Jane' })).rejects.toThrow('User not found');
    });
  });
});
