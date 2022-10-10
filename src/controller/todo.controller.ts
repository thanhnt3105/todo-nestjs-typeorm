import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoDTO } from 'src/dto/todo.dto';
import { ToDoEntity } from 'src/entites/todo.entity';
import {
  TodoEntityToDTO,
  TodoEntityToDTOs,
} from 'src/mapper/entitytodto/TodoEntityToDTO';
import { TodoRequestMapper } from 'src/mapper/requesttoentity/TodoRequestToEntity';

import TodoRequest from 'src/request/todo.request';
import { TodoService } from 'src/service/todo.service';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoMapper: TodoRequestMapper,
  ) {}

  @Get()
  async getAllTasks(): Promise<TodoDTO[]> {
    return TodoEntityToDTOs(await this.todoService.getAllTasks());
  }

  @Get(':id')
  async getOneTask(@Param('id') id: string): Promise<TodoDTO> {
    return TodoEntityToDTO(await this.todoService.getOneTask(id));
  }

  @Post()
  async createTask(@Body() taskRequest: TodoRequest): Promise<ToDoEntity> {
    return await this.todoService.createTask(
      await this.todoMapper.TodoRequestToEntity(taskRequest),
    );
  }
}
