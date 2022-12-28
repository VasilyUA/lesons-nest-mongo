import { existsSync } from 'fs';
import { parse } from 'path';
import { USER_ROLES } from '../../constants';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export const accessStrategy = (roles: [string]): string => {
	switch (true) {
		case roles.includes(USER_ROLES.ADMIN):
			return USER_ROLES.ADMIN;
		default:
			return USER_ROLES.USER;
	}
};

export const getStrategy = async (req, models, dirname) => {
	const modulePath = req.strategy;
	const extFile = parse(__filename).ext;
	const filePatch = `${dirname}/${modulePath}${extFile}`;

	if (modulePath && existsSync(filePatch)) {
		const { Strategy } = await import(filePatch);
		return new Strategy(req, models);
	}

	throw new Error(`Strategy not found for this user role ${req.strategy}`);
};
