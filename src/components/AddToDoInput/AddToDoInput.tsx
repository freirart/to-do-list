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
        console.error('> Error adding todo:', err);
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
      <div className="flex my-5">
        <input
          type="text"
          placeholder="What should you do?"
          ref={inputField}
          className={`px-5 py-2 w-full bg-slate-200 border outline-0 text-slate-600
          rounded-lg ${
            shouldDisplayError
              ? 'border-primary'
              : 'border-transparent'
          }`}
          onChange={disableErrorWhenStartTyping}
        />
        <button
          className="text-primary text-2xl p-2 hover:bg-primary/20 rounded"
          type="submit"
        >
          +
        </button>
      </div>
      {shouldDisplayError ? (
        <span className="text-primary">
          You already added this to-do!
        </span>
      ) : null}
    </form>
  );
}
