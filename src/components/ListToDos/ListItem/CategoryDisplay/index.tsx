import type { CategoryDisplayInterface } from '../../../../utils/interfaces';
import { CustomSelect } from '../../../CustomSelect';
import { useCategoryDisplay } from './hooks';

export function CategoryDisplay(props: CategoryDisplayInterface) {
  const {
    willChangeCategory,
    categories,
    todoCategory,
    toggleEdit,
    onSelect,
    uncategorizable,
    style,
    onUncategorize,
    onMouseEnter,
    onMouseLeave,
    categoryText
  } = useCategoryDisplay(props);

  if (willChangeCategory) {
    return (
      <CustomSelect
        options={categories}
        onSelect={onSelect}
        selectedVal={todoCategory}
        onBlurCb={toggleEdit}
      />
    );
  }

  return (
    <span
      data-has-category={Boolean(todoCategory)}
      data-remove={uncategorizable}
      className="relative flex ml-2 rounded bg-slate-200
        data-[has-category=true]:text-slate-50 items-center px-1 text-sm pr-1
        data-[remove=true]:pr-4 cursor-pointer"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span onClick={toggleEdit} className="p-1">
        {categoryText}
      </span>
      {uncategorizable ? (
        <span
          onClick={onUncategorize}
          className="text-sm absolute right-0 p-1 cursor-pointer bg-white/10"
        >
          X
        </span>
      ) : null}
    </span>
  );
}
