import {
  useFilterName,
  useUpdateFilterName,
  useUpdateFilterFn
} from '../../../utils/hooks';
import type { CategoryInterface } from '../../../utils/interfaces';

export const useListItem = () => {
  const filterName = useFilterName();
  const updateFilterName = useUpdateFilterName();

  const updateFilterFn = useUpdateFilterFn();

  const getOnClickFn = (itemParam: CategoryInterface) => () => {
    if (itemParam.filterFn) {
      updateFilterFn(itemParam.filterFn);
    }

    updateFilterName(itemParam.name);
  };

  return { filterName, getOnClickFn };
};
