export class TodoDTO {
  id: number;
  taskName: string;
  status: number;
  createdBy: string;
  memberAssign: string[];
  createdDate: Date;
  modifiedDate: Date;
}
