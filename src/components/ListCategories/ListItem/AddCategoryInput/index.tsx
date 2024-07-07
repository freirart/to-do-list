import { useState } from 'react';
import { CategoryForm } from './CategoryForm';

export default function AddCategoryInput() {
  const [willAddNewCategory, setWillAddNewCategory] = useState(false);

  const toggleDisplay = () =>
    setWillAddNewCategory(
      (prevWillAddNewCategory) => !prevWillAddNewCategory
    );

  if (willAddNewCategory) {
    return <CategoryForm toggleDisplay={toggleDisplay} />;
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
