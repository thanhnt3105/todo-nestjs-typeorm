import UserDTO from 'src/dto/user.dto';
import { User } from 'src/entites/user.entity';

export function UserEntityToDTO(user: User): UserDTO {
  const userDTO = new UserDTO();
  userDTO.id = user.id;
  userDTO.name = user.name;
  userDTO.username = user.username;
  userDTO.isActive = user.isActive;
  userDTO.createdDate = user.createdDate;
  userDTO.modifiedDate = user.modifiedDate;
  return userDTO;
}

export function UserEntitiesToDTOs(users: User[]): UserDTO[] {
  return users.map((user) => UserEntityToDTO(user));
}
