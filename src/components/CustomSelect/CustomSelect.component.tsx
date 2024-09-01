import { useCustomSelect } from './utils/hooks';
import type { SelectInterface } from '../../utils/interfaces';
import { InvisibleSelectOption } from './InvisibleSelectOption';
import { Dropdown } from './Dropdown';

export function CustomSelectComponent(props: SelectInterface) {
  const { filter, onChange, onFocus, handleBlur, handleSelect } =
    useCustomSelect(props);

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

      <InvisibleSelectOption />

      <Dropdown handleSelect={handleSelect} />
    </div>
  );
}
