import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerSchema } from './schemas/manufacturer.schema';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Manufacturer', schema: ManufacturerSchema }
    ])
  ],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
  exports: [ManufacturersService]
})
export class ManufacturersModule {}
