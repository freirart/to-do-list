import { useState } from 'react';
import {
  useCustomCategories,
  useUpdateCustomCategory
} from '../../../../store/ToDoStore';
import { isFilledArray } from '../../../../utils/helper';
import CustomSelect from '../../../CustomSelect';

interface CategoryDisplayInterface {
  todoId: string;
}

export default function CategoryDisplay({
  todoId
}: CategoryDisplayInterface) {
  const [willChangeCategory, setWillChangeCategory] = useState(false);

  const rawCategories = useCustomCategories();
  const categories = Object.keys(rawCategories);
  const todoCategory = Object.keys(rawCategories).find(
    (categoryName) => {
      const { todoIds } = rawCategories[categoryName];
      return isFilledArray(todoIds) && todoIds.includes(todoId);
    }
  );

  const updateCategories = useUpdateCustomCategory();

  const toggleEdit = () =>
    setWillChangeCategory(
      (prevWillChangeCategory) => !prevWillChangeCategory
    );

  if (willChangeCategory) {
    return (
      <CustomSelect
        options={categories}
        onSelect={(newCategory) =>
          updateCategories(newCategory, todoId)
        }
        selectedVal={todoCategory}
        onBlurCb={toggleEdit}
      />
    );
  }

  return (
    <span
      onClick={toggleEdit}
      data-has-category={Boolean(todoCategory)}
      className={`text-sm rounded p-1 ml-2 cursor-pointer bg-slate-200
        data-[has-category=true]:bg-primary
        data-[has-category=true]:text-slate-50`}
    >
      {todoCategory ?? 'Uncategorized'}
    </span>
  );
}
