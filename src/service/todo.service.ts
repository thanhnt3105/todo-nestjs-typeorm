import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from 'src/entites/todo.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private todoRepository: Repository<ToDoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllTasks(): Promise<ToDoEntity[]> {
    const tasks: ToDoEntity[] = await this.todoRepository.find({
      relations: { createdBy: true, memberAssign: true },
    });
    if (tasks.length != 0) return tasks;
    else {
      throw new HttpException(`Task empty!`, HttpStatus.NOT_FOUND);
    }
  }

  async getOneTask(id: string): Promise<ToDoEntity> {
    const task: ToDoEntity = await this.todoRepository.findOne({
      where: { id: +id },
      relations: { createdBy: true, memberAssign: true },
    });

    if (task) {
      return task;
    } else {
      throw new HttpException(
        `Cannot find task with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTask(todoEntity: ToDoEntity): Promise<ToDoEntity> {
    console.log('todoEntity', todoEntity);
    todoEntity.createdDate = new Date();
    todoEntity.modifiedDate = new Date();
    try {
      return this.todoRepository.save(todoEntity);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(id: string, todo: ToDoEntity): Promise<ToDoEntity> {
    const task = await this.todoRepository.findOne({
      where: { id: +id },
      relations: { createdBy: true },
    });
    task.status = todo.status;
    task.taskName = todo.taskName;
    task.createdBy = todo.createdBy;
    console.log('task', task);
    try {
      return this.todoRepository.save(task);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.todoRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `Cannot find user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMemberAssign(id: string): Promise<ToDoEntity> {
    return this.todoRepository.findOne({
      where: { id: +id },
      relations: ['memberAssign'],
    });
  }

  // async assignTask(ids:Array<number>): Promise<void> {

  // }
}
