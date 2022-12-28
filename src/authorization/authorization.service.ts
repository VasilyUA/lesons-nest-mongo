import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../db/index';
import { comparePassword } from '../helpers/bcrypt-password';

@Injectable()
export class AuthorizationService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser(userDto: CreateUserDto): Promise<any> {
		const user = await this.userService.getUserByEmailWithPassword(userDto.email);
		if (!user) throw new UnauthorizedException({ message: 'Некоректний email або пароль' });

		const passwordEquals = await comparePassword(userDto.password, user.password);
		if (!passwordEquals) throw new UnauthorizedException({ message: 'Некоректний email або пароль' });

		return user;
	}

	async validateUserById(id: string): Promise<any> {
		const user = await this.userService.getUserByID(id);
		if (!user) throw new UnauthorizedException({ message: 'Ви не авторизовані' });

		return user;
	}

	async registration(userDto: CreateUserDto) {
		const checkUser = await this.userService.getUserByEmail(userDto.email);
		if (checkUser) throw new HttpException('Користувач з таким email існує', HttpStatus.BAD_REQUEST);

		const user = await this.userService.createUser(userDto);

		return this.generateToken(user);
	}

	async login(user: User) {
		return this.generateToken(user);
	}

	private async generateToken(user: User) {
		const payload = { id: user._id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
