import { Module, forwardRef } from '@nestjs/common';

// DB schemas
import Schemas from '../db/index';

// current module
import { UserService } from './user.service';
import { UserController } from './user.controller';

// app modules
import { AuthorizationModule } from '../authorization/authorization.module';

// strategy factory service for role
import { strategy } from './strategy/factory.service';

@Module({
	imports: [Schemas, forwardRef(() => AuthorizationModule)],
	controllers: [UserController],
	providers: [UserService, ...strategy],
	exports: [UserService, ...strategy],
})
export class UserModule {}
