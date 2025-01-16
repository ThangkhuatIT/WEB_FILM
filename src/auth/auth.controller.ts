import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { TransformDataInterceptor } from 'src/common/interceptors/transform-data.interceptor';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh_token.dto';
import { ResetPasswordDto } from './dtos/change_password.dto';
import { ForGetPasswordDto } from './dtos/forget_password.dto';
import { AuthGuard } from 'src/guards/auth.guard';

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
  @Patch('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Body() resetPasswordDto: ResetPasswordDto) {
    this.authService.changePassword(resetPasswordDto);
  }
  @Post('sendMail_forget_pass')
  async sendMail_forget_pass(@Body() email: string) {
    this.authService.sendMail_forget_pass(email);
  }
  @Post('forget-password')
  async forGetPassword(@Body() forGetPasswordDto: ForGetPasswordDto) {
    this.authService.forGetPassword(forGetPasswordDto);
  }
}
