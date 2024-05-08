import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, Validate } from 'class-validator';
import { QuerySortValidator } from 'src/categories/validators/query';
import { CATEGORIES_PER_PAGE_DEFAULT } from 'src/constants';

export class QueryCategoryDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly active?: string;

  @IsString()
  @IsOptional()
  readonly search?: string;

  @IsNumber()
  @Transform(({ value }) => (!Number.isNaN(Number(value)) ? (+value === 0 ? 1 : +value) : 1))
  @IsOptional()
  readonly page?: number;

  @IsNumber()
  @Min(1)
  @Max(9)
  @Transform(({ value }) => (!Number.isNaN(Number(value)) ? +value : CATEGORIES_PER_PAGE_DEFAULT))
  @IsOptional()
  readonly pageSize?: number = CATEGORIES_PER_PAGE_DEFAULT;

  @Validate(QuerySortValidator)
  @IsOptional()
  readonly sort?: string;
}
