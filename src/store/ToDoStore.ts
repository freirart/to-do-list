import CategoryTypeObject, { CategoryName } from '../models/Category';
import ToDo from '../models/ToDo';
import { isFilledArray } from '../utils/helper';
import { FilterFn, HexColor } from '../utils/interfaces';

import Store from './';

interface StoreInterface {
  todos: ToDo[];
  customCategories: CategoryTypeObject;
  filterName: string;
  filterFn: FilterFn;
}

const _getInitialState = (): StoreInterface => {
  const defaultState = {
    todos: [],
    customCategories: {},
    filterName: 'All',
    filterFn: () => true
  };

  const storedState = localStorage.getItem('appState');

  if (storedState) {
    try {
      const parsed = JSON.parse(storedState) as StoreInterface;

      return {
        ...defaultState,
        ...parsed,
        filterName: 'All',
        filterFn: () => true
      };
    } catch (err) {
      console.error('> Error loading state from localStorage:', err);
    }
  }

  return defaultState;
};

export const initialState = _getInitialState();

const _useStore = () => Store.useStore<StoreInterface>();

export const useToDos = () => {
  const [{ todos }] = _useStore();

  return todos;
};

export const useAddToDo = () => {
  const [{ todos }, setState] = _useStore();

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
  const [_, setState] = _useStore();

  return (todoId: string) => {
    setState((draft) => {
      draft.todos = draft.todos.filter((todo) => todo.id !== todoId);
    });
  };
};

export const useToggleIsTodoDone = () => {
  const [_, setState] = _useStore();

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

export const useCustomCategories = () => {
  const [{ customCategories }] = _useStore();

  return customCategories;
};

export const useAddCustomCategory = () => {
  const [{ customCategories }, setState] = _useStore();

  return (categoryName: CategoryName, color: HexColor) => {
    if (categoryName in customCategories) {
      throw new Error('Already added!');
    }

    setState((draft) => {
      draft.customCategories = {
        ...draft.customCategories,
        [categoryName]: { color, todoIds: [] }
      };
    });
  };
};

export const useDefineCategoryFilterFn = () => {
  const [{ customCategories }] = _useStore();

  return (
    categoryName: CategoryName,
    categories: CategoryTypeObject = customCategories
  ) => {
    if (categoryName in categories) {
      const { todoIds } = categories[categoryName];

      return (todo?: ToDo) =>
        Boolean(
          todo && isFilledArray(todoIds) && todoIds.includes(todo.id)
        );
    }

    return () => true;
  };
};

export const useCategorizeToDo = () => {
  const [{ todos, customCategories, filterName }, setState] =
    _useStore();

  const defineFilterFn = useDefineCategoryFilterFn();

  return (categoryName: CategoryName, todoId: string) => {
    if (!todos.find((t) => t.id === todoId)) {
      throw new Error('Todo does not exist!');
    }

    if (!(categoryName in customCategories)) {
      throw new Error('Category does not exist!');
    }

    const previousTodoCategory = Object.keys(customCategories).find(
      (c) => customCategories[c].todoIds.includes(todoId)
    );

    setState((draft) => {
      if (previousTodoCategory) {
        draft.customCategories[previousTodoCategory].todoIds =
          draft.customCategories[previousTodoCategory].todoIds.filter(
            (id) => id !== todoId
          );

        if (filterName in customCategories) {
          const updatedCategories = JSON.parse(
            JSON.stringify(draft.customCategories)
          ) as CategoryTypeObject;

          draft.filterFn = defineFilterFn(
            previousTodoCategory,
            updatedCategories
          );
        }
      }

      draft.customCategories[categoryName].todoIds.push(todoId);
    });
  };
};

export const useUncategorizeToDo = () => {
  const [{ todos, customCategories, filterName }, setState] =
    _useStore();
  const defineFilterFn = useDefineCategoryFilterFn();

  return (todoId: string, oldCategory: CategoryName) => {
    const todo = todos.find((t) => t.id === todoId);

    if (todo) {
      const categoriesToUpdate = Object.keys(customCategories).filter(
        (c) => {
          const categoryTodoIds = customCategories[c].todoIds;

          return (
            isFilledArray(categoryTodoIds) &&
            categoryTodoIds.includes(todoId)
          );
        }
      );

      setState((draft) => {
        for (const categoryName of categoriesToUpdate) {
          const { todoIds: categoryToDos } =
            customCategories[categoryName];

          draft.customCategories[categoryName].todoIds =
            categoryToDos.filter((id) => id !== todoId);
        }

        if (filterName in customCategories) {
          const updatedCategories = JSON.parse(
            JSON.stringify(draft.customCategories)
          ) as CategoryTypeObject;

          draft.filterFn = defineFilterFn(
            oldCategory,
            updatedCategories
          );
        }
      });
    } else {
      throw new Error('Todo does not exist!');
    }
  };
};

export const useRemoveCustomCategory = (
  categoryName: CategoryName
) => {
  const [{ customCategories }, setState] = _useStore();

  const category = customCategories[categoryName];

  if (!category) {
    return null;
  }

  return () => {
    setState((draft) => {
      if (categoryName in draft.customCategories) {
        delete draft.customCategories[categoryName];

        draft.filterFn = () => true;
        draft.filterName = 'All';
      }
    });
  };
};

export const useUpdateCategoryColor = (
  categoryName: CategoryName
) => {
  const [{ customCategories }, setState] = _useStore();

  const category = customCategories[categoryName];

  if (!category) {
    return null;
  }

  return (newColor: HexColor) => {
    setState((draft) => {
      if (categoryName in draft.customCategories) {
        draft.customCategories[categoryName].color = newColor;
      }
    });
  };
};

export const useFilterName = () => {
  const [{ filterName }] = _useStore();

  return filterName;
};

export const useUpdateFilterName = () => {
  const [_, setState] = _useStore();

  return (newFilterName: string) => {
    setState((draft) => {
      draft.filterName = newFilterName;
    });
  };
};

export const useFilteredToDos = () => {
  const [{ todos, filterFn }] = _useStore();

  return todos.filter(filterFn);
};

export const useUpdateFilterFn = () => {
  const [_, setState] = _useStore();

  return (newFilterFn: FilterFn) => {
    setState((draft) => {
      draft.filterFn = newFilterFn;
    });
  };
};
