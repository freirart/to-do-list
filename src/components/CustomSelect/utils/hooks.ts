import Store from './store';
import type { SelectInterface } from '../../../utils/interfaces';
import {
  type ChangeEvent,
  type ReactNode,
  useEffect,
  useState
} from 'react';
import { getFilteredOptions } from './auxiliarFunctions';

interface StoreInterface {
  isDropDownShown: boolean;
  optionNotFound: ReactNode;
  filteredOptions: string[];
}

const _useStore = () => Store.useStore<StoreInterface>();

export const initialState: StoreInterface = {
  isDropDownShown: false,
  optionNotFound: 'Option not found 😢',
  filteredOptions: []
};

export const useIsDropDownShown = () => {
  const [{ isDropDownShown }] = _useStore();

  return isDropDownShown;
};

export const useUpdateIsDropDownShown = () => {
  const [_, setState] = _useStore();

  return (newIsDropDownShown: boolean) => {
    setState((draft) => {
      draft.isDropDownShown = newIsDropDownShown;
    });
  };
};

export const useOptionNotFound = () => {
  const [{ optionNotFound }] = _useStore();

  return optionNotFound;
};

export const useUpdateOptionNotFound = () => {
  const [_, setState] = _useStore();

  return (newOptionNotFound: ReactNode) => {
    setState((draft) => {
      draft.optionNotFound = newOptionNotFound;
    });
  };
};

export const useFilteredOptions = () => {
  const [{ filteredOptions }] = _useStore();

  return filteredOptions;
};

export const useUpdateFilteredOptions = () => {
  const [_, setState] = _useStore();

  return (newFilteredOptions: string[]) => {
    setState((draft) => {
      draft.filteredOptions = newFilteredOptions;
    });
  };
};

export const useCustomSelect = ({
  options,
  optionNotFoundMessage,
  selectedVal,
  onSelect,
  onBlurCb
}: SelectInterface) => {
  const optionNotFound = useOptionNotFound();

  const updateIsDropDownShown = useUpdateIsDropDownShown();
  const updateOptionNotFound = useUpdateOptionNotFound();
  const updateFilteredOptions = useUpdateFilteredOptions();

  const [filter, setFilter] = useState(selectedVal ?? '');

  useEffect(() => {
    if (
      optionNotFoundMessage &&
      optionNotFoundMessage !== optionNotFound
    ) {
      updateOptionNotFound(optionNotFoundMessage);
    }
  }, [optionNotFoundMessage]);

  useEffect(() => {
    updateFilteredOptions(
      getFilteredOptions(filter, options, selectedVal)
    );
  }, [filter, options, selectedVal]);

  const handleBlur = () => {
    // once the user selects, the input blur triggers first
    // cancelling the user selection
    // only blurs after a short time, making the click actually
    setTimeout(() => {
      onBlurCb();
      updateIsDropDownShown(false);
    }, 100);
  };

  const handleSelect = (opt: string) => {
    onSelect(opt);
    onBlurCb();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);
  const onFocus = () => updateIsDropDownShown(true);

  return {
    filter,
    onChange,
    onFocus,
    handleBlur,
    handleSelect
  };
};
