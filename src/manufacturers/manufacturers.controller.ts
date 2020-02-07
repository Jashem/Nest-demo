import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  Query,
  Delete
} from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer-dto';
import { Manufacturer } from './interfaces/manufacturer.interface';
import { Car } from 'src/cars/interfaces/car.interface';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createManufacturer(
    @Body() createManufacturerDto: CreateManufacturerDto
  ): Promise<Manufacturer> {
    return this.manufacturersService.createManufacturer(createManufacturerDto);
  }

  @Get()
  getAllManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturersService.getAllmanufactrers();
  }

  @Delete()
  deleteManufacturerById(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturersService.deleteManufactureByid(id);
  }
}
