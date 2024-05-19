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

  return (todoIndex: number) => {
    setState((draft) => {
      draft.todos.splice(todoIndex, 1);
    });
  };
};
