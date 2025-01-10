import { Module } from '@nestjs/common';
import { UserModule } from './users.module';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserHttpModule {}