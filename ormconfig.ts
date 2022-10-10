import { ToDoEntity } from 'src/entites/todo.entity';
import { UserEntity } from 'src/entites/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'todoapp',
  entities: [UserEntity, ToDoEntity],
  synchronize: true,
};

export default config;
