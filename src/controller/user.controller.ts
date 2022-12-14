import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import UserDTO from 'src/dto/user.dto';
import {
  UserEntityToDTO,
  UserEntitiesToDTOs,
} from 'src/mapper/entitytodto/UserEntityToDTO';
import UserRequestToEntity from 'src/mapper/requesttoentity/UserRequestToEntity';
import UserRequest from 'src/request/user.request';
import { UsersService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUser(): Promise<UserDTO[]> {
    return UserEntitiesToDTOs(await this.usersService.findAllUser());
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    return UserEntityToDTO(await this.usersService.findOneUser(id));
  }

  @Post()
  async createUser(@Body() userRequest: UserRequest): Promise<UserDTO> {
    return UserEntityToDTO(
      await this.usersService.createUser(UserRequestToEntity(userRequest)),
    );
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userRequest: UserRequest,
  ): Promise<UserDTO> {
    return UserEntityToDTO(
      await this.usersService.updateUser(id, UserRequestToEntity(userRequest)),
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }

  // @Get(':id/all')
  // async getAllTask(@Param('id') id: string): Promise<TodoDTO[]> {
  //   return TodoEntityToDTOs(await this.usersService.getAllTask(id));
  // }
}
