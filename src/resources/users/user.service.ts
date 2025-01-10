import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({where:{ email: email }});
  }
}
