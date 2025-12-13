import bcrypt from "bcrypt";

const hashPassword = async (password:string) => {
    const saltRounds = 10; // Número de rondas de salting (recomendado: 10 o más)
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error("Error al encriptar la contraseña:", error);
      throw error;
    }
  };

export default hashPassword;