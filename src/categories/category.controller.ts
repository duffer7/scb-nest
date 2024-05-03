import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryService } from './category.service';
import { ICategoriesRO, ICategoryRO } from './category.interface';
import { UpdateCategoryDTO } from 'src/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ICategoriesRO> {
    return this.categoryService.findAll();
  }

  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string): Promise<ICategoryRO> {
    return this.categoryService.findOne(idOrSlug);
  }

  @Patch(':idOrSlug')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateOne(
    @Param('idOrSlug') idOrSlug: string,
    @Body() dto: UpdateCategoryDTO,
  ): Promise<ICategoryRO> {
    return this.categoryService.updateOne(idOrSlug, dto);
  }

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }
}
