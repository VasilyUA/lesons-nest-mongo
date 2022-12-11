import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// current module
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { jwtConfig } from './jwt.seting';
import { LocalStrategy } from './strateges/local.strategy';
import { JwtStrategy } from './strateges/jwt.strategy';

import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, LocalStrategy, JwtStrategy],
  imports: [forwardRef(() => UserModule), PassportModule, JwtModule.register(jwtConfig)],
  exports: [AuthorizationService, JwtModule],
})
export class AuthorizationModule {}
