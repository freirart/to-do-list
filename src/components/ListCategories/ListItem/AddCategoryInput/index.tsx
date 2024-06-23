import { useState } from 'react';
import FormDialog from './FormDialog';

export default function AddCategoryInput() {
  const [willAddNewCategory, setWillAddNewCategory] = useState(false);

  const toggleDisplay = () =>
    setWillAddNewCategory(
      (prevWillAddNewCategory) => !prevWillAddNewCategory
    );

  if (willAddNewCategory) {
    return <FormDialog toggleDisplay={toggleDisplay} />;
  }

  return (
    <li
      onClick={toggleDisplay}
      className="cursor-pointer hover:text-primary/50 transition-colors underline"
    >
      + Add category
    </li>
  );
}
