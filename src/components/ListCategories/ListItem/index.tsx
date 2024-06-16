import {
  useFilterName,
  useUpdateFilterName,
  useUpdateFilterFn
} from '../../../store/ToDoStore';
import { CategoryInterface } from '..';
import AddCategoryInput from './AddCategoryInput';

interface ListItemInterface {
  item: CategoryInterface;
  isChild?: boolean;
}

export const getDefaultClasses = () => `
  cursor-pointer 
  hover:text-primary/50 
  transition-colors
`;

export default function ListItem({
  item,
  isChild
}: ListItemInterface) {
  const filterName = useFilterName();
  const updateFilterName = useUpdateFilterName();

  const updateFilterFn = useUpdateFilterFn();

  const getOnClickFn = (itemParam: CategoryInterface) => () => {
    if (itemParam.filterFn) {
      updateFilterFn(itemParam.filterFn);
    }

    updateFilterName(itemParam.name);
  };

  if (!item.children) {
    return (
      <li
        data-is-child={isChild}
        data-selected={!isChild && filterName === item.name}
        className="cursor-pointer hover:text-primary/50 transition-colors
          data-[selected=true]:text-primary data-[is-child=true]:underline
          data-[is-child=true]:decoration-primary"
        onClick={getOnClickFn(item)}
      >
        {item.name}
      </li>
    );
  }

  return (
    <li>
      <details>
        <summary
          data-children-selected={
            !!item.children?.find((i) => i.name === filterName)
          }
          className="cursor-pointer hover:text-primary/50 transition-colors
            data-[children-selected=true]:text-primary"
        >
          Categories
        </summary>
        <ul className="text-lg leading-10">
          <AddCategoryInput />
          {item.children.map((childrenItem, index) => (
            <ListItem isChild key={index} item={childrenItem} />
          ))}
        </ul>
      </details>
    </li>
  );
}
