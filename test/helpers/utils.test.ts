import { getKeyByValue } from '../../src/helpers/utils';
import { USER_ROLES } from '../../src/constants';

it('Test utils Get key by value', () => {
	const result = getKeyByValue(USER_ROLES, USER_ROLES.ADMIN);
	expect(result).toBe('ADMIN');
});
