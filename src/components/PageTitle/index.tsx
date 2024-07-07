import {
  useFilterName,
  useRemoveCustomCategory
} from '../../store/ToDoStore';
import { CategoryColor } from '../CategoryColor';

export default function PageTitle() {
  const filterName = useFilterName();
  const removeCategory = useRemoveCustomCategory(filterName);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <CategoryColor categoryName={filterName} proportion={4} />
        <h1 className="text-3xl text-slate-950 font-semibold">
          {filterName} Tasks
        </h1>
      </div>

      {removeCategory ? (
        <span
          className="underline text-sm cursor-pointer"
          onClick={removeCategory}
        >
          Remover categoria
        </span>
      ) : null}
    </header>
  );
}
