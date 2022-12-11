import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { CustomEmailValidation } from '../validation/email.validation';

export class CreateUserDto {
	@IsNotEmpty({ message: 'Введіть email' })
	@IsString({ message: 'Повинно бути рядком' })
	@IsEmail({}, { message: 'Некоректний email' })
	@Validate(CustomEmailValidation, { message: 'Має бути лише @gmail.com' })
	@ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
	readonly email: string;

	@IsNotEmpty({ message: 'Введіть пароль' })
	@IsString({ message: 'Повинно бути рядком' })
	@Length(2, 5, { message: 'Не менше 2 и не більше 5' })
	@ApiProperty({ example: '12345', description: 'пароль' })
	readonly password: string;
}
