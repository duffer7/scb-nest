import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigService) => ({
        entities: ['./dist/**/*.entity.js'],
        entitiesTs: ['./src/**/*.entity.ts'],
        driver: MongoDriver,
        dbName: configService.get<string>('MONGODB_NAME'),
        clientUrl: configService.get<string>('MONGODB_URI'),
        ensureIndexes: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
