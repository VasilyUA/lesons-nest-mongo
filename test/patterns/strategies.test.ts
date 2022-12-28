import { accessStrategy } from './../../src/patterns/strategies/index';
import { UserFactory } from './../../src/patterns/strategies/user/index';
import { USER_ROLES } from './../../src/constants';

describe('Tests strategies', () => {
	it('Test access admin strategy', async () => {
		const result = accessStrategy([USER_ROLES.ADMIN]);
		expect(result).toBe(USER_ROLES.ADMIN);
	});

	it('Test access admin strategy', async () => {
		const result = accessStrategy([USER_ROLES.USER]);
		expect(result).toBe(USER_ROLES.USER);
	});

	it('Test include admin strategy', async () => {
		const strategy = await UserFactory({ strategy: USER_ROLES.ADMIN });
		expect(strategy).toBeDefined();
		expect(strategy.getRequest()).toBe('getRequest');
	});

	it('Test include user strategy', async () => {
		try {
			await UserFactory({ strategy: USER_ROLES.USER });
		} catch (error) {
			expect(error.message).toBe('Strategy not found for this user role user');
		}
	});
});
