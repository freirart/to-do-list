import ToDo from '../../models/ToDo';
import { useCustomCategories } from '../../store/ToDoStore';
import ListItem from './ListItem/ListItem';

export interface CategoryInterface {
  name: string;
  filterFn?: (todo: ToDo) => boolean;
  children?: CategoryInterface[];
}

export default function ListCategories() {
  const customCategories = useCustomCategories();

  const categoriesMap: CategoryInterface[] = [
    { name: 'All', filterFn: () => true },
    { name: 'To Do', filterFn: (todo) => !todo.done },
    { name: 'Done', filterFn: (todo) => todo.done },
    {
      name: 'Categories',
      children: Object.entries(customCategories).map(
        ([categoryName, categoryInfo]) => ({
          name: categoryName,
          filterFn: (todo) => categoryInfo.todoIds.includes(todo.id)
        })
      )
    }
  ];

  return (
    <div className="flex justify-center w-1/5 h-full px-10 pt-24">
      <ul className="leading-[3.5rem] text-zinc-700 text-nowrap truncate text-2xl w-full">
        {categoriesMap.map((category, index) => (
          <ListItem key={index} item={category} />
        ))}
      </ul>
    </div>
  );
}
