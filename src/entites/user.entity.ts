import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', length: 50 })
  username: string;

  @Column({ name: 'password', length: 30 })
  password: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_date', nullable: true })
  createdDate: Date;

  @Column({ name: 'modified_date', nullable: true })
  modifiedDate: Date;
}
