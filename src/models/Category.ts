import { HexColor } from '../utils/interfaces';

export interface Category {
  color: HexColor;
  todoIds: string[];
}

export type CategoryName = string;

export type CategoryTypeObject = Record<CategoryName, Category>;
