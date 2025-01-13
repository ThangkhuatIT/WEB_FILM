import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from 'src/resources/tokens/token.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.getTokenFromHeader(req);
    if (token) {
      const data = await this.tokenService.verifyJwt(token);
      req['user'] = data.payload;
    }
    next();
  }
  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
