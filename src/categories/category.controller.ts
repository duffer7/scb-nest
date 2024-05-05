import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  async findAll(@Query() query: any): Promise<ICategoriesRO> {
    return this.categoryService.findAll(query);
  }

  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string): Promise<ICategoryRO> {
    return this.categoryService.findOne(idOrSlug);
  }

  @Delete(':idOrSlug')
  async deleteOne(@Param('idOrSlug') idOrSlug: string): Promise<number> {
    return this.categoryService.deleteOne(idOrSlug);
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
