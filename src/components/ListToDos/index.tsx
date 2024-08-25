import { useFilterName, useFilteredToDos } from '../../utils/hooks';
import ListItem from './ListItem';

export default function ListToDos() {
  const filteredToDos = useFilteredToDos();
  const filterName = useFilterName();

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
          {filterName === 'All'
            ? "It looks like you haven't add any to-dos :("
            : `There are no to-dos in "${filterName}".`}
        </div>
      )}
    </>
  );
}
