import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authorization: AuthorizationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    return this.authorization.validateUser({ email, password });
  }
}
