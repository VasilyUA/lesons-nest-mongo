import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';

import _ from 'lodash';
import { Model } from 'mongoose';

import { ROLES_KEY } from '../../patterns/decorators/roles-auth.decorator';
import { PERMISSIONS_KEY } from '../../patterns/decorators/permissions-auth.decorator';

import { Permission, PermissionDocument } from './../../db/index';

@Injectable()
export class AccessGuard implements CanActivate {
	constructor(private reflector: Reflector, @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
		const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

		const req = context.switchToHttp().getRequest();
		const roles = req.user.roles;

		const checkAccessRole = requiredRoles && roles.some(role => requiredRoles.includes(role));
		if (checkAccessRole) return checkAccessRole;

		const roleWithPermissions = await this.permissionModel.find().where('roleName').in(roles).exec();
		const permissions = _.uniq(_.flatten(roleWithPermissions.map(role => role.permissions)));
		const checkAccessPermission = requiredPermissions && permissions.some(permission => requiredPermissions.includes(permission));
		if (checkAccessPermission) return checkAccessPermission;

		throw new HttpException('Немає доступу', HttpStatus.FORBIDDEN);
	}
}
