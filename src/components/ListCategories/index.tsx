import {
  useCustomCategories,
  useDefineCategoryFilterFn
} from '../../store/ToDoStore';

import { FilterFn } from '../../utils/interfaces';
import ListItem from './ListItem';

export interface CategoryInterface {
  name: string;
  filterFn?: FilterFn;
  children?: CategoryInterface[];
}

export default function ListCategories() {
  const customCategories = useCustomCategories();
  const defineFilterFn = useDefineCategoryFilterFn();

  const categoriesMap: CategoryInterface[] = [
    { name: 'All', filterFn: () => true },
    { name: 'To Do', filterFn: (todo) => Boolean(!todo?.done) },
    { name: 'Done', filterFn: (todo) => Boolean(todo?.done) },
    {
      name: 'Categories',
      children: Object.keys(customCategories).map((categoryName) => ({
        name: categoryName,
        filterFn: defineFilterFn(categoryName)
      }))
    }
  ];

  return (
    <div className="flex justify-center w-1/5 h-full px-10 pt-24">
      <ul className="leading-[3.5rem] text-zinc-700 truncate text-2xl w-full">
        {categoriesMap.map((category, index) => (
          <ListItem key={index} item={category} />
        ))}
      </ul>
    </div>
  );
}
