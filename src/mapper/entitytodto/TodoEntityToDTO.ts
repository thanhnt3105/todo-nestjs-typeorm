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
  return todoDTO;
}

export function TodoEntityToDTOs(todoEntities: ToDoEntity[]) {
  return todoEntities.map((todo) => TodoEntityToDTO(todo));
}
