import { ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useAddToDo } from '../../utils/hooks';
import ToDo from '../../models/ToDo';

export const useAddToDoInput = () => {
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

  const textInputClassName =
    'px-5 py-2 w-full bg-slate-200 border outline-0 text-slate-600 rounded-lg ' +
    (shouldDisplayError ? 'border-red-500' : 'border-transparent');

  return {
    handleSubmit,
    disableErrorWhenStartTyping,
    textInputClassName,
    inputField,
    shouldDisplayError
  };
};
