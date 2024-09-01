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
}

const _useStore = () => Store.useStore<StoreInterface>();

export const initialState: StoreInterface = {
  isDropDownShown: false,
  optionNotFound: 'Option not found 😢'
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

export const useCustomSelect = ({
  options,
  optionNotFoundMessage,
  selectedVal,
  onSelect,
  onBlurCb
}: SelectInterface) => {
  const isDropDownShown = useIsDropDownShown();
  const updateIsDropDownShown = useUpdateIsDropDownShown();
  const optionNotFound = useOptionNotFound();
  const updateOptionNotFound = useUpdateOptionNotFound();

  const [filter, setFilter] = useState(selectedVal ?? '');

  useEffect(() => {
    if (
      optionNotFoundMessage &&
      optionNotFoundMessage !== optionNotFound
    ) {
      updateOptionNotFound(optionNotFoundMessage);
    }
  }, [optionNotFoundMessage]);

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
    isDropDownShown,
    filteredOptions,
    handleSelect,
    optionNotFound
  };
};
