import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entites/user.entity';
import { ToDoEntity } from 'src/entites/todo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ToDoEntity)
    private todoRepository: Repository<ToDoEntity>,
  ) {}

  async findAllUser(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.usersRepository.find();
    if (users.length != 0) {
      return users;
    } else {
      throw new HttpException(`User empty!`, HttpStatus.NOT_FOUND);
    }
  }

  async findOneUser(id: string): Promise<UserEntity> {
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

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const saltOrRounds = 10;
    const pass = userEntity.password;
    const hash = await bcrypt.hash(pass, saltOrRounds);

    const userCheck = await this.usersRepository.findOneBy({
      username: userEntity.username,
    });

    if (!userCheck) {
      userEntity.createdDate = new Date();
      userEntity.modifiedDate = new Date();
      userEntity.password = hash;
      return this.usersRepository.save(userEntity);
    } else {
      throw new HttpException(
        `Username ${userEntity.username} has been exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    const userUpdate: UserEntity = await this.usersRepository.findOneBy({
      id: +id,
    });
    if (userUpdate) {
      const userChoose = {
        ...userUpdate,
        ...user,
      };
      userChoose.modifiedDate = new Date();

      const userch = await this.usersRepository.findOneBy({
        username: userChoose.username,
      });
      if (userch && userch.id != +id) {
        throw new HttpException(
          `Username ${userChoose.username} has been exist`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.usersRepository.save(userChoose);
      }
    } else {
      throw new HttpException(
        `Cannot find user withhhh id ${id}`,
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

  // async getAllTask(userId: string): Promise<ToDoEntity[]> {
  //   return this.todoRepository.find({ where: { createdBy: true } });
  // }
}
