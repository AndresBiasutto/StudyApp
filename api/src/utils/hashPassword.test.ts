import hashPassword from '../utils/hashPassword';
import bcrypt from 'bcrypt';

describe('hashPassword', () => {
  it('should hash a password and return a string', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);

    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword).not.toBe(password);
  });

  it('should generate different hashes for the same password (due to salt)', async () => {
    const password = 'testPassword123';
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).not.toBe(hash2);
  });

  it('should hash password with correct salt rounds', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);
    
    const salt = hashedPassword.substring(0, 29);
    const isValidBcryptHash = salt.startsWith('$2b$10$');
    
    expect(isValidBcryptHash).toBe(true);
  });
});
