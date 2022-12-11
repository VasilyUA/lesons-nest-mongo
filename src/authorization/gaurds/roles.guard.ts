import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../patterns/decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		const req = context.switchToHttp().getRequest();
		const user = req.user;
		const roles = user.roles.map(role => role.value);

		const checkAccessRole = requiredRoles && roles.some(role => requiredRoles.includes(role));
		if (!checkAccessRole) throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);

		return checkAccessRole;
	}
}
