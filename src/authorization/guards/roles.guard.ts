import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../patterns/decorators/roles-auth.decorator';
import { PERMISSIONS_KEY } from '../../patterns/decorators/permissions-auth.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
		const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

		const req = context.switchToHttp().getRequest();
		const roles = req.user.roles;

		const checkAccessRole = requiredRoles && roles.some(role => requiredRoles.includes(role));
		const checkAccessPermission = requiredPermissions && false;

		if (checkAccessRole || checkAccessPermission) return true;

		throw new HttpException('Немає доступу', HttpStatus.FORBIDDEN);
	}
}
