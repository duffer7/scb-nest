import { IsOptional } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  readonly slug?: string;

  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly active?: boolean;
}
