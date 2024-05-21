export default class ToDo {
  id: string;
  todo: string;
  done: boolean;

  constructor(todo: string) {
    this.id = Date.now().toString();
    this.todo = todo;
    this.done = false;
  }
}
