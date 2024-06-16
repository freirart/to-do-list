import {
  useFilterName,
  useUpdateFilterName,
  useUpdateFilterFn
} from '../../../store/ToDoStore';
import { CategoryInterface } from '..';
import AddCategoryInput from './AddCategoryInput';

interface ListItemInterface {
  item: CategoryInterface;
}

export const getDefaultClasses = () => `
  cursor-pointer 
  hover:text-primary/50 
  transition-colors
`;

export default function ListItem({ item }: ListItemInterface) {
  const filterName = useFilterName();
  const updateFilterName = useUpdateFilterName();

  const updateFilterFn = useUpdateFilterFn();

  const getOnClickFn = (itemParam: CategoryInterface) => () => {
    if (itemParam.filterFn) {
      updateFilterFn(itemParam.filterFn);
    }

    updateFilterName(itemParam.name);
  };

  const className = `
    ${getDefaultClasses()}
    ${filterName === item.name ? 'text-primary' : ''}
  `;

  if (!item.children) {
    return (
      <li className={className} onClick={getOnClickFn(item)}>
        {item.name}
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary className={className}>Categories</summary>
        <ul className="text-lg leading-10">
          <AddCategoryInput />
          {item.children.map((childrenItem, index) => (
            <ListItem key={index} item={childrenItem} />
          ))}
        </ul>
      </details>
    </li>
  );
}
