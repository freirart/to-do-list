import type { Category } from '../../models/Category';
import { useCustomCategories } from '../../utils/hooks';
import type { CategoryColorInterface } from '../../utils/interfaces';

export const useCategoryColor = ({
  categoryName,
  proportion,
  onClick
}: CategoryColorInterface) => {
  const categories = useCustomCategories();

  const keyName = Object.keys(categories).find(
    (kn) => kn === categoryName
  );
  const { color: backgroundColor } = (
    keyName ? categories[keyName] : {}
  ) as Category;

  const dimension = `${Number(proportion) * 4}px`;

  const style = {
    backgroundColor,
    height: dimension,
    width: dimension
  };

  const title = onClick ? 'Update category color' : '';

  const customOnClick = onClick ? onClick : () => {};

  return {
    backgroundColor,
    style,
    title,
    customOnClick
  };
};
