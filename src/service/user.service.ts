import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity';
import UserRequest from 'src/request/user.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id: +id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // create(userRequest: UserRequest): Promise<User> {
  //   const user = new User();

  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
