import { AddCategoryInput } from './AddCategoryInput';
import { CategoryColor } from '../../CategoryColor';
import type { CategoryInterface } from '../../../utils/interfaces';
import { useListItem } from './hooks';

interface ListItemInterface {
  item: CategoryInterface;
  isChild?: boolean;
}

export function ListItem({ item, isChild }: ListItemInterface) {
  const { filterName, getOnClickFn } = useListItem();

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
