import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestContext } from 'nestjs-request-context/dist/request-context.model';
import _ from 'lodash';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../db/index';

@Injectable()
export class UserStrategyService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	getUser() {
		const req: Request = RequestContext.currentContext.req;
		const userId = _.get(req, 'user._id');

		return this.userModel.findById(userId);
	}
}
