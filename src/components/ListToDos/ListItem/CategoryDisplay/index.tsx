import { useState } from 'react';
import {
  useCustomCategories,
  useCategorizeToDo,
  useUncategorizeToDo
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
  const [shouldDisplayRemoveBtn, setShouldDisplayRemoveBtn] =
    useState(false);

  const rawCategories = useCustomCategories();
  const categories = Object.keys(rawCategories);
  const todoCategory = Object.keys(rawCategories).find(
    (categoryName) => {
      const { todoIds } = rawCategories[categoryName];
      return isFilledArray(todoIds) && todoIds.includes(todoId);
    }
  );

  const categorizeToDo = useCategorizeToDo();
  const uncategorizeToDo = useUncategorizeToDo();

  const toggleEdit = () =>
    setWillChangeCategory(
      (prevWillChangeCategory) => !prevWillChangeCategory
    );

  if (willChangeCategory) {
    return (
      <CustomSelect
        options={categories}
        onSelect={(newCategory) => {
          toggleEdit();
          categorizeToDo(newCategory, todoId);
        }}
        selectedVal={todoCategory}
        onBlurCb={toggleEdit}
      />
    );
  }

  return (
    <span
      data-has-category={Boolean(todoCategory)}
      data-remove={todoCategory && shouldDisplayRemoveBtn}
      className="relative flex ml-2 rounded bg-slate-200
        data-[has-category=true]:bg-primary
        data-[has-category=true]:text-slate-50 items-center px-1 text-sm pr-1
        data-[remove=true]:pr-4 cursor-pointer"
      onMouseEnter={() => setShouldDisplayRemoveBtn(true)}
      onMouseLeave={() => setShouldDisplayRemoveBtn(false)}
    >
      <span onClick={toggleEdit} className="p-1">
        {todoCategory ?? 'Uncategorized'}
      </span>
      {todoCategory && shouldDisplayRemoveBtn ? (
        <span
          onClick={() => uncategorizeToDo(todoId, todoCategory)}
          className="text-sm absolute right-0 p-1 cursor-pointer bg-white/10"
        >
          X
        </span>
      ) : null}
    </span>
  );
}
