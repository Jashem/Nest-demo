import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASEURL),
    ManufacturersModule,
    CarsModule
  ]
})
export class AppModule {}
