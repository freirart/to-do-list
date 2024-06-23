import { useFilterName } from '../../store/ToDoStore';
import { CategoryColor } from '../CategoryColor';

export default function PageTitle() {
  const filterName = useFilterName();

  return (
    <h1 className="text-3xl text-slate-950 font-semibold flex items-center">
      <CategoryColor categoryName={filterName} proportion={4} />
      {filterName} Tasks
    </h1>
  );
}
