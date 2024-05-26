import CategoryTypeObject, { CategoryName } from '../models/Category';
import ToDo from '../models/ToDo';

import Store from './';

interface StoreInterface {
  todos: ToDo[];
  filteredToDos: ToDo[];
  customCategories: CategoryTypeObject;
  filterName: string;
}

export const initialState: StoreInterface = {
  todos: [],
  filteredToDos: [],
  customCategories: {},
  filterName: 'All'
};

export const useToDos = () => {
  const [{ todos }] = Store.useStore<StoreInterface>();

  return todos;
};

export const useAddToDo = () => {
  const [{ todos }, setState] = Store.useStore<StoreInterface>();

  return (newToDo: ToDo) => {
    if (todos.find(({ todo }) => todo === newToDo.todo)) {
      throw new Error('Duplicated!');
    }

    setState((draft) => {
      draft.todos.push(newToDo);
    });
  };
};

export const useRemoveToDo = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (todoId: string) => {
    setState((draft) => {
      draft.todos = draft.todos.filter((todo) => todo.id !== todoId);
    });
  };
};

export const useToggleIsTodoDone = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (todoId: string, done: boolean) => {
    setState((draft) => {
      draft.todos = draft.todos.map((todo) => {
        if (todo.id === todoId) {
          todo.done = !done;
        }

        return todo;
      });
    });
  };
};

export const useUpdateFilteredToDos = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (filterFn: (todo: ToDo) => boolean) => {
    setState((draft) => {
      draft.filteredToDos = draft.todos.filter(filterFn);
    });
  };
};

export const useCustomCategories = () => {
  const [{ customCategories }] = Store.useStore<StoreInterface>();

  return customCategories;
};

export const useAddCustomCategory = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (categoryName: CategoryName) => {
    setState((draft) => {
      draft.customCategories = {
        ...draft.customCategories,
        [categoryName]: { color: 'primary', todoIds: [] }
      };
    });
  };
};

export const useRemoveCustomCategory = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (categoryName: CategoryName) => {
    setState((draft) => {
      if (categoryName in draft.customCategories) {
        delete draft.customCategories[categoryName];
      }
    });
  };
};

export const useFilterName = () => {
  const [{ filterName }] = Store.useStore<StoreInterface>();

  return filterName;
};

export const useUpdateFilterName = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (newFilterName: string) => {
    setState((draft) => {
      draft.filterName = newFilterName;
    });
  };
};
