import { Injectable } from '@nestjs/common';
import { Category } from '../entities/Category.entity';
import { EntityManager, Filter, FilterQuery, wrap } from '@mikro-orm/mongodb';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { ICategoriesRO, ICategoryRO } from './category.interface';
import { UpdateCategoryDTO } from 'src/dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly em: EntityManager,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(dto: CreateCategoryDto): Promise<ICategoryRO> {
    const { slug, name, description, active } = dto;
    const category = new Category(slug, name, description, active);
    await this.em.persistAndFlush(category);
    return category;
  }

  async findAll(): Promise<ICategoriesRO> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async findOne(idOrSlug: string): Promise<ICategoryRO> {
    const category = await this.categoryRepository.findOneOrFail({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    } as any);
    return category;
  }

  async updateOne(idOrSlug: string, data: any): Promise<ICategoryRO> {
    const category = await this.categoryRepository.findOneOrFail({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    } as any);
    wrap(category).assign(data);
    await this.em.flush();
    return category;
  }
}
