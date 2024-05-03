import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly slug!: string;

  @IsNotEmpty()
  readonly name!: string;

  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  readonly active!: boolean;
}
