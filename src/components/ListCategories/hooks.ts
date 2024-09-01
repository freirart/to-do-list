import ToDo from '../../models/ToDo';
import {
  useCustomCategories,
  useDefineCategoryFilterFn
} from '../../utils/hooks';
import { isFilledArray } from '../../utils/helper';

import type { CategoryInterface } from '../../utils/interfaces';

export const useListCategories = () => {
  const customCategories = useCustomCategories();
  const defineFilterFn = useDefineCategoryFilterFn();

  const categoriesMap: CategoryInterface[] = [
    { name: 'All', filterFn: () => true },
    { name: 'To Do', filterFn: (todo) => Boolean(!todo?.done) },
    { name: 'Done', filterFn: (todo) => Boolean(todo?.done) },
    {
      name: 'Categories',
      children: [
        {
          name: 'Uncategorized',
          filterFn: (todo?: ToDo) => {
            const allToDoIds = Object.values(customCategories).map(
              (c) => c.todoIds
            );

            return Boolean(
              todo &&
                allToDoIds.every(
                  (todoIds) =>
                    !(
                      isFilledArray(todoIds) &&
                      todoIds.includes(todo.id)
                    )
                )
            );
          }
        }
      ].concat(
        Object.keys(customCategories).map((categoryName) => ({
          name: categoryName,
          filterFn: defineFilterFn(categoryName)
        }))
      )
    }
  ];

  return { categoriesMap };
};
