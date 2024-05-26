import { useState } from 'react';
import { getDefaultClasses } from '..';
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
      className={`${getDefaultClasses()} underline`}
    >
      + Add category
    </li>
  );
}
