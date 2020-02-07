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
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car-dto';
import { Car } from './interfaces/car.interface';
import { CreateCarsDto } from './dto/craete-cars-dto';
import { ManufacturerListDto } from './dto/manufacturer-list-dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('/car')
  @UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.createCar(createCarDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCars(@Body() createCarsDto: CreateCarsDto): Promise<Car[]> {
    return this.carsService.createCars(createCarsDto);
  }

  @Get()
  getAllCars(): Promise<Car[]> {
    return this.carsService.getAllCars();
  }

  @Get('/country/:country')
  getCarsByCountry(@Param('country') country: string): Promise<Car[]> {
    return this.carsService.getCarsManufacturedInCountry(country);
  }

  @Delete('/:id')
  deleteCarById(@Param('id') id: string): Promise<Car> {
    return this.carsService.deleteCar(id);
  }

  @Get('/manufacturer/notManufactured')
  @UsePipes(ValidationPipe)
  getFilteredCars(
    @Query() manufacturerListDto: ManufacturerListDto
  ): Promise<any[]> {
    return this.carsService.getCarsFilteredByManufacturer(manufacturerListDto);
  }
}
