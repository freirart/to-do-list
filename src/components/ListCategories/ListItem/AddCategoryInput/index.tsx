import { FormEvent, useRef, useState } from 'react';
import { getDefaultClasses } from '..';
import { useAddCustomCategory } from '../../../../store/ToDoStore';

export default function AddCategoryInput() {
  const [willAddNewCategory, setWillAddNewCategory] = useState(false);

  const addCustomCategory = useAddCustomCategory();

  const newCategoryInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setWillAddNewCategory(false);

    const categoryName = newCategoryInput.current?.value;

    if (categoryName) {
      addCustomCategory(categoryName);
    }
  };

  const toggleDisplay = () =>
    setWillAddNewCategory(
      (prevWillAddNewCategory) => !prevWillAddNewCategory
    );

  if (willAddNewCategory) {
    return (
      <dialog
        className="absolute top-0 flex items-center justify-center z-10 w-full h-full
          bg-slate-900/90 text-base"
      >
        <div className="relative w-92 bg-slate-50 rounded-xl p-8 pb-20">
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-category-name">
              How will the new category be called?
            </label>
            <br />
            <input
              id="new-category-name"
              autoFocus
              type="text"
              placeholder="Ex:. College, Groceries, ..."
              className="bg-slate-200 border outline-0 text-slate-600 rounded-md w-full p-2
                my-2"
              ref={newCategoryInput}
            />
            <div className="flex justify-end mt-4 absolute bottom-5 right-5">
              <button
                type="button"
                className="px-3 py-2 bg-slate-200 hover:bg-slate-200/75 text-slate-600 rounded-lg"
                onClick={() => setWillAddNewCategory(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-green-500 hover:bg-green-500/75 text-slate-50 ml-2
                  rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }

  return (
    <li
      onClick={toggleDisplay}
      className={`${getDefaultClasses()} underline`}
    >
      + Add category
    </li>
  );
}
