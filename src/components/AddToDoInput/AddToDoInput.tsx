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
      <div className="flex">
        <input
          type="text"
          placeholder="What should you do?"
          ref={inputField}
          className={`my-5 px-5 py-2 w-full bg-slate-200 text-slate-600 rounded-lg ${
            shouldDisplayError ? 'border-red-600' : ''
          }`}
          onChange={disableErrorWhenStartTyping}
        />
        <button
          className="text-[#EA5959] text-2xl mx-2"
          type="submit"
        >
          +
        </button>
      </div>
      {shouldDisplayError ? (
        <span className="text-red-600">
          You already added this to-do!
        </span>
      ) : null}
    </form>
  );
}
