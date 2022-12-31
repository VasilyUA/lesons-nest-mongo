import { Permissions } from './../patterns/decorators/permissions-auth.decorator';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// import db modules and schemas
import { User } from '../db/index';

// current controller
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// authorization
import { JwtAuthGuard } from '../authorization/guards/jwt-auth.guard';

// pipes
import { ValidationPipe } from '../pipes/validation.pipe';

// decorators
import { Roles } from '../patterns/decorators/roles-auth.decorator';

import { AccessGuard } from '../authorization/guards/roles.guard';

// constants
import { USER_ROLES, PERMISSIONS } from './../constants';

@ApiTags('Користувачі')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Створення користувача доступно тільки для Адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: User })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.USER_CREATE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
	}

	@ApiOperation({ summary: 'Отримати всіх користувачів доступно тільки для адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.USER_READ)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Get()
	getListUsers() {
		return this.userService.getListUsers();
	}

	@ApiOperation({ summary: 'Отримати користувача за ідентифікатором доступно тільки для адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: User })
	@Roles(USER_ROLES.ADMIN, USER_ROLES.USER)
	@Permissions(PERMISSIONS.USER_READ)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Get(':id')
	getUserByID() {
		return this.userService.getUserUseId();
	}

	@ApiOperation({ summary: 'Оновити користувача за ідентифікатором доступно тільки для адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: User })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.USER_UPDATE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Put(':id')
	update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
		return this.userService.updateUserByID(id, updateUserDto);
	}

	@ApiOperation({ summary: 'Видалити користувача за ідентифікатором доступно тільки для адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: User })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.USER_DELETE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.removeUserByID(id);
	}
}
