import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';

// current module
import { AppController } from './app.controller';
import { AppService } from './app.service';

// configuration
import configuration from './config';

// database mongodb
import { mongodb } from './db/mongo';

// app modules
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PermissionModule } from './permission/permission.module';

@Module({
	imports: [configuration, ...mongodb, RequestContextModule, UserModule, AuthorizationModule, PermissionModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
