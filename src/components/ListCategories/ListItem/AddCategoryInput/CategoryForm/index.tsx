import type { FormDialogInterface } from '../../../../../utils/interfaces';
import { ColorSelector } from '../../../../ColorSelector';
import { FormDialog } from '../../../../FormDialog';
import { useCategoryForm } from './hooks';

export function CategoryForm({ toggleDisplay }: FormDialogInterface) {
  const {
    handleSubmit,
    disableErrorWhenStartTyping,
    errorMessage,
    newCategoryNameInput,
    setNewColor,
    newCategoryColor
  } = useCategoryForm(toggleDisplay);

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
        setNewColor={setNewColor}
      />
    </FormDialog>
  );
}
