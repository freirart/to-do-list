import { useFilterName } from '../../store/ToDoStore';

export default function PageTitle() {
  const filterName = useFilterName();

  return (
    <h1 className="text-3xl text-slate-950 font-semibold">
      {filterName} Tasks
    </h1>
  );
}
