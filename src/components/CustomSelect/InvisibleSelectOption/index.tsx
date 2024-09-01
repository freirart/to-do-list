import { isFilledArray } from '../../../utils/helper';
import {
  useFilteredOptions,
  useOptionNotFound
} from '../utils/hooks';

/* hidden paragraph to determine parents width since options are
 rendered in an absolute positioned div */

export const InvisibleSelectOption = () => {
  const filteredOptions = useFilteredOptions();
  const optionNotFound = useOptionNotFound();

  if (isFilledArray(filteredOptions)) {
    return filteredOptions.map((opt, index) => (
      <p key={index} className="opacity-0 h-0 min-w-48 px-2">
        {opt}
      </p>
    ));
  }

  return <p className="opacity-0 h-0 min-w-48">{optionNotFound}</p>;
};
