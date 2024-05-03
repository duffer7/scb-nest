import { Entity, EntityDTO, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { CategoryRepository } from 'src/categories/category.repository';

@Entity({ repository: () => CategoryRepository })
export class Category {
  [EntityRepositoryType]?: CategoryRepository;
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  slug!: string;

  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description = '';

  @Property()
  createdDate = new Date();

  @Property()
  active!: boolean;

  constructor(slug: string, name: string, description: string, active: boolean) {
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.active = active;
  }
}

export interface CategoryDTO extends EntityDTO<Category> {}
