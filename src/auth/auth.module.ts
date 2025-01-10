import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/resources/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [JwtModule.register({}), UserModule, MailModule],
  providers: [TokenService, AuthService],
  controllers: [AuthController],
  exports: [TokenService, AuthService],
})
export class AuthModule {}
