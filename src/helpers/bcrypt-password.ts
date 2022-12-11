import * as bcrypt from 'bcryptjs';

export const hashPassword = (value: string): Promise<any> => {
	return bcrypt.hash(value, 5);
};

export const comparePassword = async (password: string, userPassword: string): Promise<any> => {
	const isMatch = await bcrypt.compare(password, userPassword);

	return isMatch;
};
