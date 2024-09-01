import { isFilledArray } from '../../utils/helper';
import { useCustomSelect } from './utils/hooks';
import type { SelectInterface } from '../../utils/interfaces';

export function CustomSelectComponent(props: SelectInterface) {
  const {
    filter,
    onChange,
    onFocus,
    handleBlur,
    filteredOptions,
    optionNotFound,
    isDropDownShown,
    handleSelect
  } = useCustomSelect(props);

  return (
    <div className="inline-block relative ml-2 text-sm">
      <input
        type="text"
        autoFocus
        value={filter}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        className="h-4 w-full outline-none rounded py-[0.875rem] px-2 bg-slate-200"
      />

      {/* hidden paragraph to determine parents width since options are */}
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
