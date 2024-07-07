import { useFilterName } from '../../store/ToDoStore';
import { CategoryColor } from '../CategoryColor';
import { RemoveCategoryButton } from './RemoveCategoryButton';

export default function PageTitle() {
  const filterName = useFilterName();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <CategoryColor categoryName={filterName} proportion={4} />
        <h1 className="text-3xl text-slate-950 font-semibold">
          {filterName} Tasks
        </h1>
      </div>

      <RemoveCategoryButton />
    </header>
  );
}
