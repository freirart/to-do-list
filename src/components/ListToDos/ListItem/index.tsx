import ToDo from '../../../models/ToDo';
import {
  useRemoveToDo,
  useToggleIsTodoDone
} from '../../../store/ToDoStore';
import { LiaTrashSolid } from 'react-icons/lia';
import CategoryDisplay from './CategoryDisplay';

export default function ListItem({ todo: todoProp }: { todo: ToDo }) {
  const { id, todo, done } = todoProp;
  const removeToDo = useRemoveToDo();
  const toggleTodo = useToggleIsTodoDone();

  return (
    <div className="flex my-2 flex-nowrap items-center">
      <label className="flex cursor-pointer">
        <input
          className="h-0 w-0 opacity-0"
          defaultChecked={done}
          type="checkbox"
          onClick={() => toggleTodo(id, done)}
        />
        <span
          className={`flex justify-center items-center h-7 w-7 rounded-lg border
          border-primary select-none ${
            done ? 'bg-primary text-white' : 'text-transparent'
          }`}
        >
          ✔
        </span>
      </label>
      <div
        className="flex justify-between w-full py-2 ml-1 pl-2 rounded-lg
          hover:bg-slate-300/20"
      >
        <span
          className={`transition-colors ${done ? 'line-through text-neutral-400' : ''}`}
        >
          {todo}
          <CategoryDisplay todoId={id} />
        </span>
        <button
          className="hover:bg-primary/20 rounded-full p-2 mt-[-0.35rem] absolute right-10"
          onClick={() => removeToDo(id)}
        >
          <LiaTrashSolid className="text-primary text-2xl" />
        </button>
      </div>
    </div>
  );
}
