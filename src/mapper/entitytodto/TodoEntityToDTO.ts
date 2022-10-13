import { TodoDTO } from 'src/dto/todo.dto';
import { ToDoEntity } from 'src/entites/todo.entity';

export function TodoEntityToDTO(todoEntity: ToDoEntity) {
  const todoDTO = new TodoDTO();
  todoDTO.id = todoEntity.id;
  todoDTO.taskName = todoEntity.taskName;
  todoDTO.status = todoEntity.status;
  todoDTO.createdBy = todoEntity.createdBy.name;
  todoDTO.createdDate = todoEntity.createdDate;
  todoDTO.modifiedDate = todoEntity.modifiedDate;
  if (todoEntity.memberAssign) {
    todoDTO.memberAssign = todoEntity.memberAssign.map((member) => member.name);
  } else {
    todoDTO.memberAssign = null;
  }

  return todoDTO;
}

export function TodoEntityToDTOs(todoEntities: ToDoEntity[]) {
  return todoEntities.map((todo) => TodoEntityToDTO(todo));
}
