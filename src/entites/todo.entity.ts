import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todo')
export class ToDoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'task_name', length: 255 })
  taskName: string;

  @Column({ name: 'status', default: 1 })
  status: number;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn()
  createdBy: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  memberAssign: UserEntity[];

  @Column({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'modified_date' })
  modifiedDate: Date;
}
