import { useCustomCategories } from '../../../../../store/ToDoStore';
import { isFilledArray } from '../../../../../utils/helper';

interface CategorySelectInterface {
  defaultClasses: string;
  todoCategory: string | undefined;
  toggleEdit: () => void;
}

export default function CategorySelect({
  defaultClasses,
  todoCategory,
  toggleEdit
}: CategorySelectInterface) {
  const categories = useCustomCategories();
  const categoriesKeys = Object.keys(categories);

  const shouldTriggerBlurCbFn = todoCategory ? () => {} : toggleEdit;

  return (
    <select
      className={defaultClasses + ' min-w-28 outline-0 bg-slate-200'}
      onClick={shouldTriggerBlurCbFn}
      onBlur={shouldTriggerBlurCbFn}
      defaultValue={todoCategory}
    >
      {isFilledArray(categoriesKeys) ? (
        categoriesKeys.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))
      ) : (
        <option>Uncategorized</option>
      )}
    </select>
  );
}
