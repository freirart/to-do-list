import ToDo from '../models/ToDo';
import Store from './';

interface StoreInterface {
  todos: ToDo[];
}

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
