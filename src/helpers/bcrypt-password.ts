import bcrypt from 'bcryptjs';

export const hashPassword = (value: string): string => {
	const saltRounds = 11;
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(value, salt);
};

export const comparePassword = async (password: string, userPassword: string): Promise<any> => {
	const isMatch = await bcrypt.compare(password, userPassword);

	return isMatch;
};
