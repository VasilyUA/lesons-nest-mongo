import { Length, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Введіть email' })
  @IsString({ message: 'Повинна бути строки' })
  @IsEmail({}, { message: 'Не правильний email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: 'Повинна бути строкам' })
  @Length(2, 5, { message: 'Не менше 2 і не більше 5 символів' })
  readonly password: string;
}
