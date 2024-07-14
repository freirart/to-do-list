import {
  useFilterName,
  useUpdateFilterName,
  useUpdateFilterFn
} from '../../../store/hooks';
import { CategoryInterface } from '..';
import AddCategoryInput from './AddCategoryInput';
import { CategoryColor } from '../../CategoryColor';

interface ListItemInterface {
  item: CategoryInterface;
  isChild?: boolean;
}

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

  const { children, name } = item;

  if (!children) {
    return (
      <li
        data-is-child={isChild}
        data-selected={!isChild && filterName === name}
        className="cursor-pointer hover:text-primary/50 transition-colors
          data-[selected=true]:text-primary flex items-center"
        onClick={getOnClickFn(item)}
      >
        <CategoryColor categoryName={name} proportion={2} />
        {name}
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
          {children.map((childrenItem, index) => (
            <ListItem isChild key={index} item={childrenItem} />
          ))}
        </ul>
      </details>
    </li>
  );
}
