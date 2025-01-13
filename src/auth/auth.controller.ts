import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { TransformDataInterceptor } from 'src/common/interceptors/transform-data.interceptor';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh_token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(new TransformDataInterceptor(SignInResponseDto))
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }


  @Post('login')
  @UseInterceptors(new TransformDataInterceptor(SignInResponseDto))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('refresh-token')
  async refresh_token(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
