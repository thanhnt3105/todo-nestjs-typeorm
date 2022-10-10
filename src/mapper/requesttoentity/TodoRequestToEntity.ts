import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from 'src/entites/todo.entity';
import { UserEntity } from 'src/entites/user.entity';
import TodoRequest from 'src/request/todo.request';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRequestMapper {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async TodoRequestToEntity(todoRequest: TodoRequest): Promise<ToDoEntity> {
    const todo = new ToDoEntity();
    todo.taskName = todoRequest.taskName;
    const task = await this.userRepository.findOne({
      where: { id: todoRequest.createdById },
    });
    todo.createdBy = task;
    todo.status = todoRequest.status;
    return todo;
  }
}
