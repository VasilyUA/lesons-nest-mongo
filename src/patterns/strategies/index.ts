import { existsSync } from 'fs';
import { parse } from 'path';

export const accessStrategy = (roles: [string]): string => {
	switch (true) {
		case roles.includes('ADMIN'):
			return 'admin';
		default:
			return 'user';
	}
};

export const getStrategy = async (req, dirname) => {
	const modulePath = req.strategy;
	const extFile = parse(__filename).ext;
	const filePatch = `${dirname}/${modulePath}${extFile}`;

	if (modulePath && existsSync(filePatch)) {
		const { Strategy } = await import(filePatch);
		return new Strategy(req);
	}
};
