import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from 'src/entites/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity])],
  providers: [],
  controllers: [],
})
export class TodoModule {}
