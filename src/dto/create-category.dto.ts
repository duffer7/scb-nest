import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly slug!: string;

  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  readonly active!: boolean;
}
