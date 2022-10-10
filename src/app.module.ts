import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './../ormconfig';
import { UserModule } from './module/user.module';
import { TodoModule } from './module/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
