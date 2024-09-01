import { SelectInterface } from '../../utils/interfaces';
import { CustomSelectComponent } from './CustomSelect.component';
import Store from './utils/store';

import { initialState } from './utils/hooks';

export const CustomSelect = (props: SelectInterface) => {
  return (
    <Store.Provider initialState={initialState}>
      <CustomSelectComponent {...props} />
    </Store.Provider>
  );
};
