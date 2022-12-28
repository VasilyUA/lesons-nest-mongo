import _ from 'lodash';
import BaseStrategy from './base';

class UserStrategy extends BaseStrategy {
	constructor(req, models) {
		super(req, models);
	}

	public async getUser() {
		const user = _.get(this.req, 'user');
		return user;
	}
}

export const Strategy = UserStrategy;
