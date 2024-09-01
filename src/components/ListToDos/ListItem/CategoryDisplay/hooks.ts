import { useState } from 'react';
import {
  useCustomCategories,
  useCategorizeToDo,
  useUncategorizeToDo
} from '../../../../utils/hooks';
import { isFilledArray } from '../../../../utils/helper';
import type { CategoryDisplayInterface } from '../../../../utils/interfaces';
import type { CategoryName } from '../../../../models/Category';

export const useCategoryDisplay = ({
  todoId
}: CategoryDisplayInterface) => {
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

  const onSelect = (newCategory: CategoryName) => {
    toggleEdit();
    categorizeToDo(newCategory, todoId);
  };

  const onMouseEnter = () => setShouldDisplayRemoveBtn(true);
  const onMouseLeave = () => setShouldDisplayRemoveBtn(false);

  const style = todoCategory
    ? { backgroundColor: rawCategories[todoCategory].color }
    : {};

  const categoryText = todoCategory ?? 'Uncategorized';
  const uncategorizable = todoCategory && shouldDisplayRemoveBtn;

  const onUncategorize = () =>
    todoCategory ? uncategorizeToDo(todoId, todoCategory) : {};

  return {
    todoCategory,
    willChangeCategory,
    categories,
    toggleEdit,
    onMouseEnter,
    onMouseLeave,
    style,
    categoryText,
    uncategorizable,
    onUncategorize,
    onSelect
  };
};
