import { SelectInterface } from '../../utils/interfaces';
import { CustomSelectComponent } from './CustomSelect.component';
import Store from './utils/store';

export const CustomSelect = (props: SelectInterface) => {
  return (
    <Store.Provider initialState={{ isDropDownShown: false }}>
      <CustomSelectComponent {...props} />
    </Store.Provider>
  );
};
