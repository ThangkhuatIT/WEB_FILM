import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/resources/users/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { SignInResponseDto } from '../dtos/signin-response.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { RESET_PASSWORD_SUBJECT, VERIFY_SUBJECT } from '../constants';
import { TokenService } from 'src/resources/tokens/token.service';
import { TokenType } from 'src/resources/tokens/types/token';
import { LoginDto } from '../dtos/login.dto';
import { UserNotFoundException } from 'src/resources/users/exceptions/userNotFound.exception';
import { RefreshTokenDto } from '../dtos/refresh_token.dto';
import { ResetPasswordDto } from '../dtos/change_password.dto';
import { ForGetPasswordDto } from '../dtos/forget_password.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async register(registerDto: RegisterDto): Promise<SignInResponseDto> {
    const { name, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email đã được đăng ký.');
    }
    const newUser = await this.userService.store({
      name,
      email,
      password: hashedPassword,
    });
    const verificationCode = await this.tokenService.getToken(TokenType.VERIFY);
    const verificationLink = `https://your-website.com/verify?code=${verificationCode}`;
    this.mailService.sendEmail({
      to: newUser.email,
      subject: VERIFY_SUBJECT,
      template: 'verifyEmail',
      context: {
        subject: VERIFY_SUBJECT,
        name: newUser.name,
        verificationLink,
      },
    });
    const [refreshToken, accessToken] = await Promise.all([
      this.tokenService.getJwt(newUser, TokenType.REFRESH),
      this.tokenService.getJwt(newUser, TokenType.ACCESS),
    ]);
    return {
      accessToken,
      refreshToken,
      user: newUser,
    };
  }
  async login(loginDto: LoginDto): Promise<SignInResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Mật khẩu không chính xác');
      }
      const [refreshToken, accessToken] = await Promise.all([
        this.tokenService.getJwt(user, TokenType.REFRESH),
        this.tokenService.getJwt(user, TokenType.ACCESS),
      ]);
      return {
        accessToken,
        refreshToken,
        user: { ...user },
      };
    }
  }
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { token, userId } = refreshTokenDto;
    try {
      const user = await this.userService.findById(userId);
      if (!user) throw new UserNotFoundException();
      const data = await this.tokenService.verifyJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (data.exp && currentTime > data.exp)
        throw new BadRequestException('token không hợp lệ');

      const [refreshToken, accessToken] = await Promise.all([
        this.tokenService.getJwt(user, TokenType.REFRESH),
        this.tokenService.getJwt(user, TokenType.ACCESS),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
  async changePassword(resetPasswordDto: ResetPasswordDto) {
    const { userId, password, oldPassword } = resetPasswordDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu sai');
    }
    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    await user.save();
  }
  async sendMail_forget_pass(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    const resetPasswordCode = await this.tokenService.getToken(
      TokenType.RESET_PASS,
    );
    const resetPasswordLink = `https://your-website.com/verify?code=${resetPasswordCode}`;
    this.mailService.sendEmail({
      to: user.email,
      subject: RESET_PASSWORD_SUBJECT,
      template: 'verifyEmail',
      context: {
        subject: RESET_PASSWORD_SUBJECT,
        name: user.name,
        resetPasswordLink,
      },
    });
  }
  async forGetPassword(forGetPasswordDto: ForGetPasswordDto) {
    const { userId, password } = forGetPasswordDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    await user.save();
  }
}
