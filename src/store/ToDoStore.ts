import Store from './';

interface StoreInterface {
  todos: string[];
}

export const useToDos = () => {
  const [{ todos }] = Store.useStore<StoreInterface>();

  return todos;
};

export const useAddToDo = () => {
  const [_, setState] = Store.useStore<StoreInterface>();

  return (newToDo: string) => {
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
