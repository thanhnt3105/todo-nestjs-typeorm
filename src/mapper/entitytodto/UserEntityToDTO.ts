import UserDTO from 'src/dto/user.dto';
import { UserEntity } from 'src/entites/user.entity';

export function UserEntityToDTO(user: UserEntity): UserDTO {
  const userDTO = new UserDTO();
  userDTO.id = user.id;
  userDTO.name = user.name;
  userDTO.username = user.username;
  userDTO.isActive = user.isActive;
  userDTO.createdDate = user.createdDate;
  userDTO.modifiedDate = user.modifiedDate;
  userDTO.role = user.role;
  return userDTO;
}

export function UserEntitiesToDTOs(users: UserEntity[]): UserDTO[] {
  return users.map((user) => UserEntityToDTO(user));
}
