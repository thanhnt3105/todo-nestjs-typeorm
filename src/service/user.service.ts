import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity';
import UserDTO from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersRepository.find();
      if (users.length != 0) {
        return users;
      } else {
        throw new HttpException(`User empty!`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(`User empty!`, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id: +id });
      if (user) {
        return user;
      } else {
        throw new HttpException(
          `Cannot find user with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Cannot find user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  create(userEntity: User): Promise<User> {
    userEntity.createdDate = new Date();
    userEntity.modifiedDate = new Date();
    return this.usersRepository.save(userEntity);
  }

  async update(userDTO: UserDTO): Promise<User> {
    const id = String(userDTO.id);
    const userUpdate = await this.findOne(id);
    userUpdate.name = userDTO.name;
    userUpdate.username = userDTO.username;
    userUpdate.isActive = userDTO.isActive;
    userUpdate.createdDate = userDTO.createdDate;
    userUpdate.modifiedDate = new Date();
    return this.usersRepository.save(userUpdate);
  }

  async delete(id: string): Promise<void> {
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
