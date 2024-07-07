import { useState } from 'react';
import {
  useFilterName,
  useRemoveCustomCategory
} from '../../../store/ToDoStore';
import { FormDialog } from '../../FormDialog';

export function RemoveCategoryButton() {
  const [displayRemovalConfirmation, setDisplayRemovalConfirmation] =
    useState(false);

  const filterName = useFilterName();
  const removeCategory = useRemoveCustomCategory(filterName);

  if (!removeCategory) {
    return null;
  }

  const handleSubmit = () => {
    removeCategory();
    setDisplayRemovalConfirmation(false);
  };

  return (
    <>
      <span
        className="underline text-sm cursor-pointer"
        onClick={() => setDisplayRemovalConfirmation(true)}
      >
        Remove category
      </span>
      {displayRemovalConfirmation ? (
        <FormDialog
          handleSubmit={handleSubmit}
          submitBtnText="Confirm"
          cancelFn={() => setDisplayRemovalConfirmation(false)}
        >
          <p>
            Please confirm the removal of the &quot;{filterName}&quot;
            category.
          </p>
        </FormDialog>
      ) : null}
    </>
  );
}
