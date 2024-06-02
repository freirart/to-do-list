import { ReactNode, useState } from 'react';
import { isFilledArray } from '../../utils/helper';

type SelectedValType = string | null | undefined;

const getFilteredOptions = (
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

interface SelectInterface {
  options: string[];
  selectedVal: SelectedValType;
  onSelect: (newSelectedVal: string) => void;
  optionNotFoundMessage?: ReactNode;
  onBlurCb: () => void;
}

export default function CustomSelect({
  options,
  optionNotFoundMessage,
  selectedVal,
  onSelect,
  onBlurCb
}: SelectInterface) {
  const [isDropDownShown, setIsDropDownShown] = useState(true);
  const [filter, setFilter] = useState(selectedVal ?? '');

  const optionNotFound =
    optionNotFoundMessage ?? 'Option not found 😢';

  const filteredOptions = getFilteredOptions(
    filter,
    options,
    selectedVal
  );

  const handleBlur = () => {
    // once the user selects, the input blur triggers first
    // cancelling the user selection
    // only blurs after a short time, making the click actually
    setTimeout(() => {
      onBlurCb();
      setIsDropDownShown(false);
    }, 100);
  };

  const handleSelect = (opt: string) => {
    onSelect(opt);
    setIsDropDownShown(false);
    onBlurCb();
  };

  return (
    <div className="inline-block relative ml-2 text-sm">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onFocus={() => setIsDropDownShown(true)}
        onBlur={handleBlur}
        className="h-4 w-full outline-none rounded py-[0.875rem] px-2 bg-slate-200"
      />

      {/* hidden paragraph to determine parents width since the options are */}
      {/* rendered in an absolute positioned div */}
      {isFilledArray(filteredOptions) ? (
        filteredOptions.map((opt, index) => (
          <p key={index} className="opacity-0 h-0 min-w-48 px-2">
            {opt}
          </p>
        ))
      ) : (
        <p className="opacity-0 h-0 min-w-48">{optionNotFound}</p>
      )}

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
    </div>
  );
}
