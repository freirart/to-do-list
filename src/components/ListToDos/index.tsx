import { useListToDos } from './hooks';
import { ListItem } from './ListItem';

export function ListToDos() {
  const { filteredToDos, emptyMessage } = useListToDos();

  return (
    <>
      {filteredToDos.length ? (
        <ul>
          {filteredToDos.map((todo) => (
            <li key={todo.id}>
              <ListItem todo={todo} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-full items-center justify-center text-neutral-400">
          {emptyMessage}
        </div>
      )}
    </>
  );
}
