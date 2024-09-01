import { isFilledArray } from '../../../utils/helper';
import {
  useFilteredOptions,
  useIsDropDownShown,
  useOptionNotFound
} from '../utils/hooks';

interface DropdownProps {
  handleSelect: (opt: string) => void;
}

export const Dropdown = ({ handleSelect }: DropdownProps) => {
  const isDropDownShown = useIsDropDownShown();
  const filteredOptions = useFilteredOptions();
  const optionNotFound = useOptionNotFound();

  return (
    <div
      data-shown={isDropDownShown}
      className="absolute top-[1.8rem] z-10 data-[shown=false]:hidden"
    >
      {isFilledArray(filteredOptions) ? (
        filteredOptions.map((opt, index) => (
          <p
            key={index}
            className="flex items-center rounded h-2 py-[0.875rem] px-2 bg-slate-100
              select-none hover:bg-primary hover:text-slate-50 min-w-48"
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </p>
        ))
      ) : (
        <p
          className="flex items-center rounded h-2 py-[0.875rem] px-2 bg-slate-100
            text-slate-500 select-none min-w-48"
        >
          {optionNotFound}
        </p>
      )}
    </div>
  );
};
