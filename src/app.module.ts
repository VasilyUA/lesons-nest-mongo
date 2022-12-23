import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';
import { mongodb } from './db/mongo';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
@Module({
	imports: [configuration, ...mongodb, UserModule, AuthorizationModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
