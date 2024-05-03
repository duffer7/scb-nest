import { EntityRepository } from '@mikro-orm/mongodb';
import { Category } from 'src/entities/Category.entity';

export class CategoryRepository extends EntityRepository<Category> {}
