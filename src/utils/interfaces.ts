import ToDo from '../models/ToDo';

export type FilterFn = (todo?: ToDo) => boolean;

export type HexColor = `#${string}`;

export interface CategoryColorInterface {
  categoryName: string;
  proportion?: number;
  onClick?: () => void;
}
