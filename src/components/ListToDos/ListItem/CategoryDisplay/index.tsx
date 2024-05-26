import { useState } from 'react';
import { useCustomCategories } from '../../../../store/ToDoStore';
import { isFilledArray } from '../../../../utils/helper';
import CategorySelect from './CategorySelect';

interface CategoryDisplayInterface {
  todoId: string;
}

export default function CategoryDisplay({
  todoId
}: CategoryDisplayInterface) {
  const [willChangeCategory, setWillChangeCategory] = useState(false);
  const categories = useCustomCategories();

  const todoCategory = Object.keys(categories).find(
    (categoryName) => {
      const { todoIds } = categories[categoryName];
      return isFilledArray(todoIds) && todoIds.includes(todoId);
    }
  );

  const defaultClasses = 'text-sm rounded p-1 ml-2 cursor-pointer';

  const toggleEdit = () =>
    setWillChangeCategory(
      (prevWillChangeCategory) => !prevWillChangeCategory
    );

  if (!willChangeCategory) {
    if (!todoCategory) {
      return (
        <span
          onClick={toggleEdit}
          className={defaultClasses + ' bg-slate-200'}
        >
          Uncategorized
        </span>
      );
    }

    return (
      <span
        onClick={toggleEdit}
        className={`${defaultClasses} bg-${categories[todoCategory].color}`}
      >
        {todoCategory}
      </span>
    );
  }

  return (
    <CategorySelect
      defaultClasses={defaultClasses}
      todoCategory={todoCategory}
      toggleEdit={toggleEdit}
    />
  );
}
