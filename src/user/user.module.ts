import { Module, forwardRef } from '@nestjs/common';

// DB schemas
import Schemas from '../db/index';

// current module
import { UserService } from './user.service';
import { UserController } from './user.controller';

// authorization
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
	imports: [Schemas, forwardRef(() => AuthorizationModule)],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
