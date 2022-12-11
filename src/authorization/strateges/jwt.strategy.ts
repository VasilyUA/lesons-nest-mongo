import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authorization: AuthorizationService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user = await this.authorization.validateUserById(payload.id);
		return user.toJSON();
	}
}
