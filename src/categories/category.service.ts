import { Injectable } from '@nestjs/common';
import { Category } from '../entities/Category.entity';
import { EntityManager, wrap } from '@mikro-orm/mongodb';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { ICategoriesRO, ICategoryRO } from './category.interface';
import { buildSearchText, stringToBoolean } from 'src/utils';

const CATEGORIES_PER_PAGE_DEFAULT = 2;
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

  async findAll(query: any): Promise<ICategoriesRO> {
    const { name, description, active, search, sort, page, pageSize } = query;
    const pageSizeComputed = !Number.isNaN(Number(pageSize))
      ? +pageSize
      : CATEGORIES_PER_PAGE_DEFAULT;
    const pageComputed = !Number.isNaN(Number(page)) ? (+page === 0 ? 1 : +page) : 1;
    const where: any[] = [
      {
        $match: {},
      },
      {
        $sort: { createdDate: -1 },
      },
    ];
    if (sort) {
      const key = sort.slice(0, 1) === '-' ? sort.substring(1) : sort;
      if (Object.getOwnPropertyNames(Category.prototype).includes(key)) {
        const direction = sort.slice(0, 1) === '-' ? -1 : 1;
        where[1].$sort = {
          [key]: direction,
        };
      }
    }
    if (search) {
      where[0].$match.$text = {
        $search: search,
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
    } else if (name || description) {
      const searchText = buildSearchText([name, description]);
      where[0].$match.$text = {
        $search: searchText,
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
    }
    if (active) {
      where[0]['$match'] = {
        active: stringToBoolean(active),
      };
    }
    const [count] = await this.categoryRepository.aggregate([...where, { $count: 'total' }]);
    const categoriesTotal = count.total;
    where.push(
      {
        $skip: (pageComputed - 1) * pageSizeComputed,
      },
      {
        $limit: pageSizeComputed,
      },
    );
    const categories = await this.categoryRepository.aggregate(where);
    return {
      categories: categories,
      categoriesPerPage: pageSizeComputed,
      categoriesTotal: categoriesTotal,
      pagesTotal: Math.ceil(categoriesTotal / pageSizeComputed),
      hasNext: pageSizeComputed * pageComputed < categoriesTotal,
      hasPrevious: pageComputed > 1,
      nextPage: pageComputed + 1,
      previousPage: pageComputed - 1,
      currentPage: pageComputed,
      from: (pageComputed - 1) * pageSizeComputed + 1,
      to: Math.min(pageComputed * pageSizeComputed, categoriesTotal),
    };
  }

  async findOne(idOrSlug: string): Promise<ICategoryRO> {
    const category = await this.categoryRepository.findOneOrFail({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    } as any);
    return category;
  }

  async deleteOne(idOrSlug: string): Promise<number> {
    return await this.categoryRepository.nativeDelete({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    } as any);
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
