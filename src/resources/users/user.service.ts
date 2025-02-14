import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  private readonly userRepository: Repository<User>;
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository);
    this.userRepository = userRepository;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user ? user : null;
  }
}
