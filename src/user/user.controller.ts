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

import { Roles } from '../patterns/decorators/roles-auth.decorator';
import { RolesGuard } from '../authorization/guards/roles.guard';

@ApiTags('Користувачі')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Створення користувача доступно тільки для Адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.createUser(createUserDto);
	}

	@ApiOperation({ summary: 'Отримати всіх користувачів доступно тільки для Адміна' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Get()
	getListUsers() {
		return this.userService.getListUsers();
	}

	@Get(':id')
	getUserByID(@Param('id') id: string) {
		return this.userService.getUserByID(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.updateUserByID(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.removeUserByID(id);
	}
}
