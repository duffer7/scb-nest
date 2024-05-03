import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from 'src/entities/Category.entity';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService],
  imports: [MikroOrmModule.forFeature([Category])],
  providers: [CategoryService],
})
export class CategoryModule {}
