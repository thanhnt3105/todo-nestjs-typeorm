import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async createTask(@Body() taskRequest: TodoRequest): Promise<TodoDTO> {
    return TodoEntityToDTO(
      await this.todoService.createTask(
        await this.todoMapper.TodoRequestToEntity(taskRequest),
      ),
    );
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskRequest: TodoRequest,
  ): Promise<TodoDTO> {
    return TodoEntityToDTO(
      await this.todoService.updateTask(
        id,
        await this.todoMapper.TodoRequestToEntity(taskRequest),
      ),
    );
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTask(id);
  }

  @Get('assign/:id')
  async getMemberAssign(@Param('id') id: string): Promise<ToDoEntity> {
    return await this.todoService.getMemberAssign(id);
  }

  @Post('assign/:id')
  async assignMemberToTask(
    @Param('id') taskId: string,
    @Body() ids: string[],
  ): Promise<ToDoEntity> {
    return await this.todoService.assignTask(taskId, ids);
  }
}
