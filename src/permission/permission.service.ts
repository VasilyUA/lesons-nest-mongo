import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

// current module
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

// DB schemas
import { Permission, PermissionDocument } from '../db/index';

@Injectable()
export class PermissionService {
	constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {}

	create(createPermissionDto: CreatePermissionDto) {
		return this.permissionModel.create(createPermissionDto);
	}

	findAll() {
		return this.permissionModel.find();
	}

	findOne(role: string) {
		return this.permissionModel.findOne({ roleName: role });
	}

	async update(role: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
		const permission = await this.permissionModel.findOne({ roleName: role });
		if (!permission) throw new HttpException('Роль не була знайдена', HttpStatus.BAD_REQUEST);

		permission['roleName'] = updatePermissionDto.roleName;
		permission['permissions'] = updatePermissionDto.permissions;

		return permission.save();
	}

	remove(role: string) {
		return this.permissionModel.deleteOne({ roleName: role }).exec();
	}
}
