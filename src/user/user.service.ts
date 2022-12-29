import { FactoryService } from './strategy/factory.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from '../db/index';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, readonly factoryService: FactoryService) {}

	createUser(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create(createUserDto);
	}

	getListUsers() {
		return this.userModel.find();
	}

	async getUserByID(id) {
		return this.userModel.findById(id);
	}

	async getUserUseId() {
		const strategy = this.factoryService.getStrategy();
		return strategy.getUser();
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
