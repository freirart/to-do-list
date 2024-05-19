export default class ToDo {
  id: string;
  todo: string;

  constructor(todo: string) {
    this.id = Date.now().toString();
    this.todo = todo;
  }
}
