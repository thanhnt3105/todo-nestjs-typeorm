import { User } from 'src/entites/user.entity';
import UserRequest from 'src/request/user.request';

function UserRequestToEntity(userRequest: UserRequest): User {
  const user = new User();
  user.name = userRequest.name;
  user.username = userRequest.username;
  user.password = userRequest.password;
  user.role = userRequest.role;
  return user;
}

export default UserRequestToEntity;
