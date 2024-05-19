import { FormEvent, useRef } from 'react';
import {
  useAddToDo,
  useRemoveToDo,
  useToDos
} from './store/ToDoStore';
import ToDo from './models/ToDo';

export default function ToDoApp() {
  const todos = useToDos();
  const addToDo = useAddToDo();
  const removeToDo = useRemoveToDo();

  const inputField = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const input = inputField.current;
    const inputValue = input?.value;

    if (inputValue) {
      addToDo(new ToDo(inputValue));
      input.value = '';
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-todo-input">To Do: </label>
        <input
          id="add-todo-input"
          type="text"
          placeholder="What should you do?"
          ref={inputField}
        />
        <button type="submit">Add To Do</button>
      </form>
      <ul>
        {todos.map(({ id, todo }, index) => (
          <li key={index}>
            {id}: {todo}{' '}
            <button onClick={() => removeToDo(index)}>
              <span aria-label="Trash bin" role="img">
                🗑
              </span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
