import { Module } from '@nestjs/common';
import { CategoryModule } from './categories/category.module';
import { MongoModule } from './modules/mongo.module';

@Module({
  imports: [MongoModule, CategoryModule],
})
export class AppModule {}
