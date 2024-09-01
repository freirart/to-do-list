import { useState } from 'react';

export const useAddCategoryInput = () => {
  const [willAddNewCategory, setWillAddNewCategory] = useState(false);

  const toggleDisplay = () =>
    setWillAddNewCategory(
      (prevWillAddNewCategory) => !prevWillAddNewCategory
    );

  return { toggleDisplay, willAddNewCategory };
};
