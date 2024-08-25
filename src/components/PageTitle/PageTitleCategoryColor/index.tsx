import { useState } from 'react';
import {
  useCustomCategories,
  useFilterName,
  useUpdateCategoryColor
} from '../../../utils/hooks';
import { CategoryColor } from '../../CategoryColor';
import { FormDialog } from '../../FormDialog';
import { ColorSelector } from '../../ColorSelector';

export function PageTitleCategoryColor() {
  const [displayChangeColorDialog, setDisplayChangeColorDialog] =
    useState(false);

  const filterName = useFilterName();
  const customCategories = useCustomCategories();

  const category = customCategories[filterName];
  const categoryColor = category?.color;

  const [updatedColor, setUpdatedColor] = useState(
    categoryColor ?? ''
  );

  const updateCategoryColor = useUpdateCategoryColor(filterName);

  const handleSubmit = () => {
    if (updateCategoryColor) {
      updateCategoryColor(updatedColor);
      setDisplayChangeColorDialog(false);
    } else {
      console.error(
        'Called update category fn for an unidentified category!',
        filterName
      );
    }
  };

  return (
    <>
      <CategoryColor
        categoryName={filterName}
        proportion={4}
        onClick={() => setDisplayChangeColorDialog(true)}
      />
      {displayChangeColorDialog && updateCategoryColor ? (
        <FormDialog
          cancelFn={() => setDisplayChangeColorDialog(false)}
          handleSubmit={handleSubmit}
          submitBtnText="Update"
        >
          <p className="text-base font-normal">
            Which will be the new color for the &quot;{filterName}
            &quot; category?
          </p>
          <ColorSelector
            hasReturnToDefaultBtn={false}
            defaultColor={categoryColor}
            setNewColor={(hexColor) => setUpdatedColor(hexColor)}
          />
        </FormDialog>
      ) : null}
    </>
  );
}
