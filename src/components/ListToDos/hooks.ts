import { useFilterName, useFilteredToDos } from '../../utils/hooks';

export const useListToDos = () => {
  const filteredToDos = useFilteredToDos();
  const filterName = useFilterName();

  const emptyMessage =
    filterName === 'All'
      ? "It looks like you haven't add any to-dos :("
      : `There are no to-dos in "${filterName}".`;

  return {
    filteredToDos,
    emptyMessage
  };
};
