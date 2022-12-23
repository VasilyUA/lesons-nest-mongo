import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from '../db/index';

import { UserFactory } from '../patterns/strategies/user';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	createUser(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create(createUserDto);
	}

	async getListUsers(req: Request) {
		const strategy = await UserFactory(req);
		console.log(strategy.getRequest()); // eslint-disable-line no-console
		return this.userModel.find();
	}

	getUserByID(id: string) {
		return this.userModel.findById(id);
	}

	getUserByEmail(email: string) {
		return this.userModel.findOne({ email: email });
	}

	getUserByEmailWithPassword(email: string) {
		return this.userModel.findOne({ email: email }).select('+password');
	}

	updateUserByID(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.findByIdAndUpdate(
			id,
			{
				email: updateUserDto.email,
				password: updateUserDto.password,
			},
			{ new: true },
		);
	}

	removeUserByID(id: string) {
		return this.userModel.deleteOne({ _id: id });
	}
}
