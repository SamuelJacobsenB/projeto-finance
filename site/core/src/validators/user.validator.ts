import { UserDto } from "../types";

export const validateUser = (userDto: UserDto) => {
  const { name, email, password } = userDto;

  const errors: string[] = [];

  if (!name || name.length < 3 || name.length > 50) {
    errors.push("Nome deve ter entre 3 e 50 caracteres");
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Email inválido");
  }

  if (!password || password.length < 8 || password.length > 15) {
    errors.push("Senha deve ter entre 8 e 15 caracteres");
  }

  return {
    error: errors.length > 0 ? errors[0] : undefined,
    isValid: errors.length === 0,
  };
};
