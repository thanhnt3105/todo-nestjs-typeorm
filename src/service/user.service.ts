import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();
    if (users.length != 0) {
      return users;
    } else {
      throw new HttpException(`User empty!`, HttpStatus.NOT_FOUND);
    }
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: +id });
    if (user) {
      return user;
    } else {
      throw new HttpException(
        `Cannot find user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createUser(userEntity: User): Promise<User> {
    const userCheck = await this.usersRepository.findOneBy({
      username: userEntity.username,
    });

    if (!userCheck) {
      userEntity.createdDate = new Date();
      userEntity.modifiedDate = new Date();
      return this.usersRepository.save(userEntity);
    } else {
      throw new HttpException(
        `Username ${userEntity.username} has been exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(user: User): Promise<User> {
    //user: request
    const userUpdate: User = await this.usersRepository.findOneBy({
      id: user.id,
    });
    if (userUpdate) {
      //found
      const userChoose = {
        ...userUpdate,
        ...user,
      };
      userChoose.modifiedDate = new Date();

      const userch = await this.usersRepository.findOneBy({
        username: userChoose.username,
      });
      if (!userch) {
        return this.usersRepository.save(userChoose);
      } else {
        throw new HttpException(
          `Username ${userChoose.username} has been exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        `Cannot find user withhhh id ${user.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `Cannot find user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
