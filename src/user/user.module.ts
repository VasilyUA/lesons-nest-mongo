import { Module, forwardRef } from '@nestjs/common';

// DB schemas
import Schemas from '../db/index';

// current module
import { UserService } from './user.service';
import { UserController } from './user.controller';

// authorization
import { AuthorizationModule } from '../authorization/authorization.module';
import { strategy } from './strategy/factory.service';

@Module({
	imports: [Schemas, forwardRef(() => AuthorizationModule)],
	controllers: [UserController],
	providers: [UserService, ...strategy],
	exports: [UserService, ...strategy],
})
export class UserModule {}
