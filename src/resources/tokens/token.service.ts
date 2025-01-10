import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService extends BaseService<Token> {
  constructor(@InjectRepository(Token) repository: Repository<Token>) {
    super(repository);
  }
  async signToken(type:string):Promise<Token>{
    return this.store({
        token:'adasdasdas'
        type,
    })
  }
}
