import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'task_name', length: 255 })
  taskName: string;

  @Column({ name: 'status' })
  status: number;

  // @Column({ name: 'name', length: 100 })
  // file: string;

  @Column({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'modified_date' })
  modifiedDate: Date;
}
