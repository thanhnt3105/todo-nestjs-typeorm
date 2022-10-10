import { UserEntity } from 'src/entites/user.entity';
import UserRequest from 'src/request/user.request';

function UserRequestToEntity(userRequest: UserRequest): UserEntity {
  const user = new UserEntity();
  user.name = userRequest.name;
  user.username = userRequest.username;
  user.password = userRequest.password;
  user.role = userRequest.role;
  return user;
}

export default UserRequestToEntity;
