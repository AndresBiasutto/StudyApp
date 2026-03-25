import comparePassword from '../utils/comparePassword';
import bcrypt from 'bcrypt';

describe('comparePassword', () => {
  const plainPassword = 'testPassword123';
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash(plainPassword, 10);
  });

  it('should return true for correct password', async () => {
    const result = await comparePassword(plainPassword, hashedPassword);
    expect(result).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const result = await comparePassword('wrongPassword', hashedPassword);
    expect(result).toBe(false);
  });

  it('should return false for empty password', async () => {
    const result = await comparePassword('', hashedPassword);
    expect(result).toBe(false);
  });
});
