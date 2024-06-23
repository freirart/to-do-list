export interface Category {
  color: string;
  todoIds: string[];
}

export type CategoryName = string;

type CategoryTypeObject = Record<CategoryName, Category>;

export default CategoryTypeObject;
