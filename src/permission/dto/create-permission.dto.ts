import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, NotEquals } from 'class-validator';
import { USER_ROLES } from './../../constants';

export class CreatePermissionDto {
	@IsNotEmpty({ message: 'Введіть roleName' })
	@IsString({ message: 'Повинно бути рядком' })
	@NotEquals(Object.values(USER_ROLES), { message: 'Неможливо надати доступи адміністратору' })
	@ApiProperty({ example: 'support', description: 'Імя ролі для якої будуть надані доступи' })
	readonly roleName: string;

	@IsNotEmpty({ message: 'Введіть permissions' })
	@IsArray({ message: 'Повинно бути масивом' })
	@ArrayNotEmpty({ message: 'Масив не може бути порожнім' })
	@ApiProperty({ example: ['user:create', 'user:get-list'], description: 'Список доступів для конкретної ролі' })
	readonly permissions: [string];
}
