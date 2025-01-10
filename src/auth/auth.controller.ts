import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { TransformDataInterceptor } from 'src/common/interceptors/transform-data.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(new TransformDataInterceptor(SignInResponseDto))
  async register(@Body() registerDto: RegisterDto) {    
     return this.authService.register(registerDto);
  }
}
