import { useFilterName } from '../../utils/hooks';
import { PageTitleCategoryColor } from './PageTitleCategoryColor';
import { RemoveCategoryButton } from './RemoveCategoryButton';

export function PageTitle() {
  const filterName = useFilterName();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-3xl text-slate-950 font-semibold flex items-center">
          <PageTitleCategoryColor />
          {filterName} Tasks
        </h1>
      </div>

      <RemoveCategoryButton />
    </header>
  );
}
