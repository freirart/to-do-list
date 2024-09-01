import type { SelectedValType } from '../../../utils/interfaces';

export const getFilteredOptions = (
  filter: SelectedValType,
  options: string[],
  initialVal: SelectedValType
) => {
  if (filter) {
    if (filter !== initialVal) {
      const filterRegex = new RegExp(filter, 'gi');

      return options.filter((opt) => opt.match(filterRegex));
    }

    return [
      initialVal,
      ...options.filter((opt) => opt !== initialVal)
    ];
  }

  return options;
};
