import { CategoryDTO } from 'src/entities/Category.entity';

export interface ICategoryRO extends CategoryDTO {}

export interface ICategoriesRO {
  categories: ICategoryRO[];
  categoriesPerPage: number;
  categoriesTotal: number;
  pagesTotal: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: number;
  previousPage: number;
  currentPage: number;
  from: number;
  to: number;
}
