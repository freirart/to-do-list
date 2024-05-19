import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAddToDo } from '../../store/ToDoStore';
import ToDo from '../../models/ToDo';

export default function AddToDoInput() {
  const [shouldDisplayError, setShouldDisplayError] = useState(false);

  const addToDo = useAddToDo();
  const inputField = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const input = inputField.current;
    const inputValue = input?.value;

    if (inputValue) {
      try {
        addToDo(new ToDo(inputValue));
        input.value = '';
      } catch (err) {
        setShouldDisplayError(true);
      }
    }
  };

  const disableErrorWhenStartTyping = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (shouldDisplayError && e.target.value) {
      setShouldDisplayError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-todo-input">To Do: </label>
      <input
        id="add-todo-input"
        type="text"
        placeholder="What should you do?"
        ref={inputField}
        className={shouldDisplayError ? 'border-red-600' : ''}
        onChange={disableErrorWhenStartTyping}
      />
      <button type="submit">Add To Do</button>
      {shouldDisplayError ? (
        <span className="text-red-600">
          You already added this to-do!
        </span>
      ) : null}
    </form>
  );
}
