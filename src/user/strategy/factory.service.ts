import { Injectable } from '@nestjs/common';
import { RequestContext } from 'nestjs-request-context/dist/request-context.model';
import _ from 'lodash';
import { Request } from 'express';

import { USER_ROLES } from './../../constants';

import { AdminStrategyService } from './admin.service';
import { UserStrategyService } from './user.service';

@Injectable()
export class FactoryService {
	constructor(private readonly adminStrategyService: AdminStrategyService, private readonly userStrategyService: UserStrategyService) {}

	getStrategy() {
		const req: Request = RequestContext.currentContext.req;
		const roles = _.get(req, 'user.roles', []);

		switch (true) {
			case roles.includes(USER_ROLES.ADMIN):
				return this.adminStrategyService;

			default:
				return this.userStrategyService;
		}
	}
}

export const strategy = [FactoryService, UserStrategyService, AdminStrategyService];
