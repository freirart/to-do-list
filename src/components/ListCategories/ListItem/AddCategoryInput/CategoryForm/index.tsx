import { FormEvent, useRef, useState } from 'react';
import { useAddCustomCategory } from '../../../../../store/hooks';
import { ColorSelector } from '../../../../ColorSelector';
import { HexColor } from '../../../../../utils/interfaces';
import { FormDialog } from '../../../../FormDialog';

interface FormDialogInterface {
  toggleDisplay: () => void;
}

export function CategoryForm({ toggleDisplay }: FormDialogInterface) {
  const [errorMessage, setErrorMessage] = useState('');
  const [newCategoryColor, setNewCategoryColor] =
    useState<HexColor>('#EA5959');

  const addCustomCategory = useAddCustomCategory();

  const newCategoryNameInput = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const categoryName = newCategoryNameInput.current?.value;

    if (categoryName && newCategoryColor) {
      try {
        addCustomCategory(categoryName, newCategoryColor);
        toggleDisplay();
      } catch (_) {
        setErrorMessage('You already added this category!');
      }
    } else {
      setErrorMessage('All fields are required!');
    }
  };

  const disableErrorWhenStartTyping = () => {
    if (errorMessage && newCategoryNameInput.current?.value) {
      setErrorMessage('');
    }
  };

  return (
    <FormDialog
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
      cancelFn={toggleDisplay}
      submitBtnText="Submit"
    >
      <label htmlFor="new-category-name">
        How will the new category be called?
      </label>
      <br />
      <input
        id="new-category-name"
        autoFocus
        type="text"
        data-error={!!errorMessage}
        placeholder="Ex:. College, Groceries, ..."
        className="bg-slate-200 border outline-0 text-slate-600 rounded-md w-full p-2
          my-2 data-[error=true]:border-red-500 border-transparent"
        ref={newCategoryNameInput}
        onKeyDown={disableErrorWhenStartTyping}
      />
      <br />
      <label htmlFor="new-category-color">
        Choose a color for the new category:
      </label>
      <ColorSelector
        defaultColor={newCategoryColor}
        setNewColor={(hexColor) => setNewCategoryColor(hexColor)}
      />
    </FormDialog>
  );
}
