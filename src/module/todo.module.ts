import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'src/controller/todo.controller';
import { ToDoEntity } from 'src/entites/todo.entity';
import { UserEntity } from 'src/entites/user.entity';
import { TodoRequestMapper } from 'src/mapper/requesttoentity/TodoRequestToEntity';
import { TodoService } from 'src/service/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity, UserEntity])],
  providers: [TodoService, TodoRequestMapper],
  controllers: [TodoController],
})
export class TodoModule {}
