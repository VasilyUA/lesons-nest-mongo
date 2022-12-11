import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
	@IsNotEmpty({ message: 'Введіть email' })
	@IsString({ message: 'Повинно бути рядком' })
	@IsEmail({}, { message: 'Некоректний email' })
	@ApiProperty({ example: 'admin@gmail.com', description: 'Пошта' })
	readonly email: string;

	@IsNotEmpty({ message: 'Введіть пароль' })
	@IsString({ message: 'Повинно бути рядком' })
	@Length(2, 5, { message: 'Не менше 2 и не більше 5' })
	@ApiProperty({ example: '2820', description: 'пароль' })
	readonly password: string;
}
