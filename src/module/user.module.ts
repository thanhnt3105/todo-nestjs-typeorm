import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { ToDoEntity } from 'src/entites/todo.entity';
import { UserEntity } from 'src/entites/user.entity';
import { UsersService } from 'src/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ToDoEntity])],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
