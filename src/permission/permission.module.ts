import { Module } from '@nestjs/common';

// current module
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

// DB schemas
import Schemas from '../db/index';

// app modules
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
	imports: [Schemas, AuthorizationModule],
	controllers: [PermissionController],
	providers: [PermissionService],
	exports: [PermissionService],
})
export class PermissionModule {}
