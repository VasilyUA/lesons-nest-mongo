import _ from 'lodash';
import BaseStrategy from './base';

class AdminStrategy extends BaseStrategy {
	constructor(req, models) {
		super(req, models);
	}

	public getUser() {
		const id = _.get(this.req, 'params.id');
		const userModel = _.get(this.models, 'userModel', {});

		return userModel.findById(id);
	}
}

export const Strategy = AdminStrategy;
