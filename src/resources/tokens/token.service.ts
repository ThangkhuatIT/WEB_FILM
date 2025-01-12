import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenType } from 'src/resources/tokens/types/token';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from 'src/auth/constants';

@Injectable()
export class TokenService extends BaseService<Token> {
  constructor(
    @InjectRepository(Token) repository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }
  async getToken(type: TokenType): Promise<string> {
    const newToken = await this.store({
      token: this.randomString(10),
      type,
    });
    return newToken.token;
  }
  async getJwt(payload: User, type: TokenType): Promise<string> {
    const expiresIn =
      type === 'REFRESH' ? REFRESH_TOKEN_LIFETIME : ACCESS_TOKEN_LIFETIME;
    return this.jwtService.signAsync(
      {
        sub: payload.id,
        username: payload.name,
        role: payload.role,
        isActive: payload.isActive,
      },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn,
      },
    );
  }
  randomString(length: number) {
    const chars =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const charsLength = chars.length;

    const randomArray = Array.from(
      { length },
      () => chars[Math.floor(Math.random() * charsLength)],
    );

    const randomString = randomArray.join('');
    return randomString;
  }
}
