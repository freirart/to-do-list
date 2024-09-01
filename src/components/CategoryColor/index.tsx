import type { CategoryColorInterface } from '../../utils/interfaces';
import { useCategoryColor } from './hooks';

export const CategoryColor = (props: CategoryColorInterface) => {
  const { backgroundColor, title, style, customOnClick } =
    useCategoryColor(props);

  if (backgroundColor) {
    return (
      <span
        title={title}
        data-onclick={!!props.onClick}
        className="rounded-full inline-block mr-2 data-[onclick=true]:cursor-pointer"
        style={style}
        onClick={customOnClick}
      />
    );
  }

  return null;
};
