import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/resources/users/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { SignInResponseDto } from '../dtos/signin-response.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { VERIFY_SUBJECT } from '../constants';
import { TokenService } from 'src/resources/tokens/token.service';
import { TokenType } from 'src/resources/tokens/types/token';
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
}
