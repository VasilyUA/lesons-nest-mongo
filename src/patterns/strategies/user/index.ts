import { getStrategy } from '../index';

export const UserFactory = req => {
	return getStrategy(req, __dirname);
};
