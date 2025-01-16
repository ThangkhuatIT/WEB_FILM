import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/resources/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/resources/tokens/token.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [UserModule, MailModule, TokenModule, UploadModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
