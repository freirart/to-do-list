import AddToDoInput from './components/AddToDoInput/AddToDoInput';
import { useRemoveToDo, useToDos } from './store/ToDoStore';

export default function ToDoApp() {
  const todos = useToDos();
  const removeToDo = useRemoveToDo();

  return (
    <main>
      <AddToDoInput />
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
