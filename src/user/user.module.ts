import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import Schemas from '../db/index';

@Module({
  imports: [Schemas],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
