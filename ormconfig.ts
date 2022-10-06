// import { ToDo } from 'src/entites/todo.entity';
import { ToDo } from 'src/entites/todo.entity';
import { User } from 'src/entites/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'todoapp',
  entities: ['dist/src/entites/*.entity.ts'],
  synchronize: true,
};

export default config;
