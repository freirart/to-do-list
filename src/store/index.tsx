import {
  useContext,
  createContext,
  useMemo,
  FC,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react';

import { useImmer } from 'use-immer';

type ContextType = [object, Dispatch<SetStateAction<any>>] | null;

const context = createContext<ContextType>(null);

const Provider: FC<{
  children?: ReactNode;
  initialState: object;
}> = ({ children, initialState }) => {
  const [state, setState] = useImmer(initialState);

  const contextValue = useMemo(
    () => [state, setState] as ContextType,
    [state]
  );

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

const useStore = <T,>() => {
  type DrafterFnType = (draft: T) => void;
  type StoreType = [T, (fn: DrafterFnType) => void];

  return useContext(context) as StoreType;
};

export default {
  useStore,
  Provider
};
