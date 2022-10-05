import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/entites/user.entity';
import { UsersService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
