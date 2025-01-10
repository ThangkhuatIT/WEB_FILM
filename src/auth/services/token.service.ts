import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/resources/users/user.entity';
import { TokenType } from '../types/token';
import { promises } from 'dns';
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '../constants';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async signToken(payload: User, type: TokenType): Promise<string> {
    const expiresIn =
      type === 'refreshToken' ? REFRESH_TOKEN_LIFETIME : ACCESS_TOKEN_LIFETIME;
    return this.jwtService.signAsync(
      {
        sub: payload.id,
        username: payload.name,
        role: payload.role,
        isActive: payload.isActive,
      },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn
      },
    );
  }
  
}
