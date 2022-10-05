import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from 'src/entites/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  providers: [],
  controllers: [],
})
export class TodoModule {}
