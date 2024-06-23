import { Category } from '../../models/Category';
import { useCustomCategories } from '../../store/ToDoStore';

interface CategoryColorInterface {
  categoryName: string;
  proportion: number;
}

export const CategoryColor = ({
  categoryName,
  proportion
}: CategoryColorInterface) => {
  const categories = useCustomCategories();

  const keyName = Object.keys(categories).find(
    (kn) => kn === categoryName
  );
  const { color: backgroundColor } = (
    keyName ? categories[keyName] : {}
  ) as Category;

  const proportionsClass = `h-${proportion} w-${proportion}`;

  if (backgroundColor) {
    return (
      <span
        className={`rounded-full inline-block mr-2 ${proportionsClass}`}
        style={{ backgroundColor }}
      />
    );
  }

  return null;
};
