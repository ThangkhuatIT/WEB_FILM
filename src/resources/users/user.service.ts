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
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email: email } });
    return user ? user : null;
  }
}
