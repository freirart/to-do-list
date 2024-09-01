import type { ReactNode } from 'react';
import type ToDo from '../models/ToDo';

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

export interface CategoryDisplayInterface {
  todoId: string;
}

export type SelectedValType = string | null | undefined;

export interface SelectInterface {
  options: string[];
  selectedVal: SelectedValType;
  onSelect: (newSelectedVal: string) => void;
  optionNotFoundMessage?: ReactNode;
  onBlurCb: () => void;
}
