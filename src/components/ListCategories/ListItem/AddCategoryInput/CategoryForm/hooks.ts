import { useRef, useState } from 'react';
import { useAddCustomCategory } from '../../../../../utils/hooks';

import type {
  FormDialogInterface,
  HexColor
} from '../../../../../utils/interfaces';

export const useCategoryForm = (
  toggleDisplay: FormDialogInterface['toggleDisplay']
) => {
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

  const setNewColor = (hexColor: HexColor) =>
    setNewCategoryColor(hexColor);

  return {
    handleSubmit,
    disableErrorWhenStartTyping,
    errorMessage,
    newCategoryNameInput,
    newCategoryColor,
    setNewColor
  };
};
