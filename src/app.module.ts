import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';
import { mongodb } from './db/mongo';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
	imports: [configuration, ...mongodb, RequestContextModule, UserModule, AuthorizationModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
