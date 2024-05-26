import { useToDos } from '../../store/ToDoStore';
import ListItem from './ListItem';

export default function ListToDos() {
  const todos = useToDos();

  return (
    <>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <ListItem todo={todo} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-full items-center justify-center text-neutral-400">
          It looks like you have&apos;t add any to-dos :(
        </div>
      )}
    </>
  );
}
