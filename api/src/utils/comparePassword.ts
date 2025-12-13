import bcrypt from 'bcrypt';

const comparePassword = async (password: string, hashedPassword: string) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match; // Devuelve true si la contraseña coincide, false en caso contrario
    } catch (error) {
      console.error("Error al comparar contraseñas:", error);
      throw error;
    }
  };

export default comparePassword;