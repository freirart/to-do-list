import ToDo from '../models/ToDo';

export type FilterFn = (todo?: ToDo) => boolean;

export type HexColor = `#${string}`;

export interface CategoryColorInterface {
  categoryName: string;
  proportion?: number;
  onClick?: () => void;
}

export interface CategoryInterface {
  name: string;
  filterFn?: FilterFn;
  children?: CategoryInterface[];
}

export interface FormDialogInterface {
  toggleDisplay: () => void;
}
