import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  index(): Promise<User[]> {
    return this.userService.index()
  }
  // @Get()
  // index(): any {
  //   return { 'name': 1 };
  // }
}
