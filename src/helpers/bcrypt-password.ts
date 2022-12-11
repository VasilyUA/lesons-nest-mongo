import * as bcrypt from 'bcryptjs';

export const hashPassword = async (user): Promise<any> => {
  const hashPassword = await bcrypt.hash(user.password, 5);

  return { ...user, password: hashPassword };
};

export const comparePassword = async (password: string, userPassword: string): Promise<any> => {
  const isMatch = await bcrypt.compare(password, userPassword);

  return isMatch;
};
