import { CategoryDTO } from 'src/entities/Category.entity';

export interface ICategoryRO extends CategoryDTO {}

export interface ICategoriesRO extends Array<ICategoryRO> {}
