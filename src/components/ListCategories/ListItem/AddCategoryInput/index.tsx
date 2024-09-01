import { CategoryForm } from './CategoryForm';
import { useAddCategoryInput } from './hooks';

export function AddCategoryInput() {
  const { willAddNewCategory, toggleDisplay } = useAddCategoryInput();

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
