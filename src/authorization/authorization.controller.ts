import { Body, Controller, HttpCode, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// current module
import { AuthorizationService } from './authorization.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

// user module
import { CreateUserDto } from './../user/dto/create-user.dto';

ApiTags('Авторизація');
@Controller()
export class AuthorizationController {
	constructor(private readonly authorizationService: AuthorizationService) {}

	@ApiOperation({ summary: 'Реєстрація користувача з ролею користувач платформи' })
	@ApiResponse({ status: 200, type: Object })
	@UsePipes(ValidationPipe)
	@Post('/registration')
	@HttpCode(201)
	registration(@Body() userDto: CreateUserDto) {
		return this.authorizationService.registration(userDto);
	}

	@ApiOperation({ summary: 'Логін користувача' })
	@ApiResponse({ status: 200, type: Object })
	@UsePipes(ValidationPipe)
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@HttpCode(200)
	login(@Request() req) {
		return this.authorizationService.login(req.user);
	}
}
