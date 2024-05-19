import { useRemoveToDo, useToDos } from '../../store/ToDoStore';

export default function ListToDos() {
  const todos = useToDos();
  const removeToDo = useRemoveToDo();

  return (
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
  );
}
