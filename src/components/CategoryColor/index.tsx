import { Category } from '../../models/Category';
import { useCustomCategories } from '../../store/ToDoStore';

interface CategoryColorInterface {
  categoryName: string;
  proportion?: number;
  onClick?: () => void;
}

export const CategoryColor = ({
  categoryName,
  proportion = 4,
  onClick
}: CategoryColorInterface) => {
  const categories = useCustomCategories();

  const keyName = Object.keys(categories).find(
    (kn) => kn === categoryName
  );
  const { color: backgroundColor } = (
    keyName ? categories[keyName] : {}
  ) as Category;

  const dimension = `${proportion * 4}px`;

  if (backgroundColor) {
    return (
      <span
        title={onClick ? 'Update category color' : ''}
        data-onclick={!!onClick}
        className="rounded-full inline-block mr-2 data-[onclick=true]:cursor-pointer"
        style={{
          backgroundColor,
          height: dimension,
          width: dimension
        }}
        onClick={onClick ? onClick : () => {}}
      />
    );
  }

  return null;
};
