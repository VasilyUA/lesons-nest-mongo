import { Controller, Get, Post, Body, Param, Delete, UseGuards, UsePipes, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';

// current service
import { PermissionService } from './permission.service';

// dto
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

// import db modules and schemas
import { Permission } from '../db/index';

// decorators
import { Roles } from './../patterns/decorators/roles-auth.decorator';
import { Permissions } from './../patterns/decorators/permissions-auth.decorator';

// constants
import { USER_ROLES, PERMISSIONS } from './../constants';

// authorization guards
import { AccessGuard } from './../authorization/guards/roles.guard';
import { JwtAuthGuard } from './../authorization/guards/jwt-auth.guard';

// validation pipe
import { ValidationPipe } from './../pipes/validation.pipe';

@ApiTags('Доступи для ролі')
@Controller('permission')
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@ApiOperation({ summary: 'Створення доступів для ролі' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 201, type: Permission })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.PERMISSION_CREATE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() createPermissionDto: CreatePermissionDto) {
		return this.permissionService.create(createPermissionDto);
	}

	@ApiOperation({ summary: 'Отримання список всіх доступів для ролі' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: [Permission] })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.PERMISSION_READ)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Get()
	findAll() {
		return this.permissionService.findAll();
	}

	@ApiOperation({ summary: 'Отримання доступів для ролі' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: Permission })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.PERMISSION_READ)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Get(':role')
	findOne(@Param('role') role: string) {
		return this.permissionService.findOne(role);
	}

	@ApiOperation({ summary: 'Оновлення доступів для ролі' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: Permission })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.PERMISSION_UPDATE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Put(':role')
	update(@Param('role') role: string, @Body(ValidationPipe) updatePermissionDto: UpdatePermissionDto) {
		return this.permissionService.update(role, updatePermissionDto);
	}

	@ApiOperation({ summary: 'Видалення доступів для ролі' })
	@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
	@ApiResponse({ status: 200, type: Permission })
	@Roles(USER_ROLES.ADMIN)
	@Permissions(PERMISSIONS.PERMISSION_DELETE)
	@UseGuards(JwtAuthGuard, AccessGuard)
	@Delete(':role')
	remove(@Param('role') role: string) {
		return this.permissionService.remove(role);
	}
}
