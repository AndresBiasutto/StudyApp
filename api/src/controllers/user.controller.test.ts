import userController from '../controllers/user.controller';
import userService from '../services/user.service';

jest.mock('../services/user.service');

describe('UserController', () => {
  const mockService = userService as jest.Mocked<typeof userService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should call userService.registerUser with correct data', async () => {
      const mockUser = { id_user: '1', name: 'John', e_mail: 'test@test.com' };
      mockService.registerUser = jest.fn().mockResolvedValue(mockUser);

      const result = await userController.registerUser({
        name: 'John',
        e_mail: 'test@test.com',
        password: 'password123',
      });

      expect(mockService.registerUser).toHaveBeenCalledWith({
        name: 'John',
        e_mail: 'test@test.com',
        password: 'password123',
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error if user already exists', async () => {
      mockService.registerUser = jest.fn().mockRejectedValue(new Error('El usuario ya existe'));

      await expect(userController.registerUser({
        e_mail: 'existing@test.com',
      })).rejects.toThrow('El usuario ya existe');
    });
  });

  describe('loginUser', () => {
    it('should call userService.loginUser with correct data', async () => {
      const mockResponse = { token: 'jwt-token', id_user: '1', name: 'John', last_name: 'Doe', e_mail: 'test@test.com', image: null, contactNumber: null, description: null, role: null, createdSubjects: null };
      mockService.loginUser = jest.fn().mockResolvedValue(mockResponse);
      mockService.getUserByEmail = jest.fn().mockResolvedValue({ id_user: '1', e_mail: 'test@test.com', password: 'hashed' });

      const result = await userController.loginUser({
        e_mail: 'test@test.com',
        password: 'password123',
      });

      expect(mockService.loginUser).toHaveBeenCalledWith({
        e_mail: 'test@test.com',
        password: 'password123',
      });
    });
  });

  describe('getMe', () => {
    it('should call userService.getMe with user id', async () => {
      const mockUser = { id_user: 'user-123', name: 'John', last_name: 'Doe', description: null, e_mail: 'test@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null, id_role: null };
      mockService.getMe = jest.fn().mockResolvedValue(mockUser);

      const result = await userController.getMe('user-123');

      expect(mockService.getMe).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should call userService.getAllUsers', async () => {
      const mockUsers = [{ id_user: '1', name: 'John', last_name: 'Doe', description: null, e_mail: 'test@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null, id_role: null }, { id_user: '2', name: 'Jane', last_name: 'Doe', description: null, e_mail: 'test2@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null, id_role: null }];
      mockService.getAllUsers = jest.fn().mockResolvedValue(mockUsers);

      const result = await userController.getAllUsers();

      expect(mockService.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUser', () => {
    it('should call userService.getUser with id', async () => {
      const mockUser = { id_user: 'user-123', name: 'John', last_name: 'Doe', description: null, e_mail: 'test@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null, id_role: null };
      mockService.getUser = jest.fn().mockResolvedValue(mockUser);

      const result = await userController.getUser('user-123');

      expect(mockService.getUser).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should call userService.updateUser with id and data', async () => {
      const updatedUser = { id_user: 'user-123', name: 'Jane', last_name: 'Doe', description: null, e_mail: 'test@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null, id_role: null };
      mockService.updateUser = jest.fn().mockResolvedValue(updatedUser);

      const result = await userController.updateUser('user-123', { name: 'Jane' });

      expect(mockService.updateUser).toHaveBeenCalledWith('user-123', { name: 'Jane' });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should call userService.deleteUser', async () => {
      mockService.deleteUser = jest.fn().mockResolvedValue(true);

      await userController.deleteUser('user-123');

      expect(mockService.deleteUser).toHaveBeenCalledWith('user-123');
    });
  });

  describe('updateUserRole', () => {
    it('should call userService.updateUserRole when id_role is provided', async () => {
      const updatedUser = { id_user: 'user-123', id_role: 'role-1', name: 'John', last_name: 'Doe', description: null, e_mail: 'test@test.com', id_teacher: null, contact_number: null, image: null, Role: null, subjects: null };
      mockService.updateUserRole = jest.fn().mockResolvedValue(updatedUser);
      mockService.getUser = jest.fn().mockResolvedValue({ id_user: 'user-123' });

      const result = await userController.updateUserRole('user-123', 'role-1');

      expect(mockService.updateUserRole).toHaveBeenCalledWith('user-123', 'role-1');
    });
  });
});
