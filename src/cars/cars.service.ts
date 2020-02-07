import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car-dto';
import { CreateCarsDto } from './dto/craete-cars-dto';
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';
import { ManufacturerListDto } from './dto/manufacturer-list-dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel('Car') private readonly carModel: Model<Car>,
    private readonly manufacturersSecvice: ManufacturersService
  ) {}

  async createCar(createCraDto: CreateCarDto): Promise<Car> {
    const newCar = new this.carModel(createCraDto);
    const savedCar = await newCar.save();
    return savedCar;
  }

  async createCars(createCarsDto: CreateCarsDto): Promise<Car[]> {
    const newCars = await this.carModel.create(createCarsDto.cars);
    return newCars;
  }

  async getAllCars(): Promise<Car[]> {
    const cars = await this.carModel.find({});
    return cars;
  }

  async getCarsManufacturedInCountry(country: string): Promise<Car[]> {
    const manufacturers = await this.manufacturersSecvice.getManufacturersByCountry(
      country
    );
    if (manufacturers.length) {
      const manufactrerIds = manufacturers.map(
        (manufacturer): string => manufacturer.id
      );
      const cars = await this.getCarsByManufacturer(manufactrerIds);
      return cars;
    }
    return [];
  }

  async getCarsByManufacturer(manufacturerIds: string[]): Promise<Car[]> {
    const cars = await this.carModel.find({
      manufacturer: { $in: manufacturerIds }
    });
    return cars;
  }

  async deleteCar(id: string): Promise<Car> {
    const deletedCar = await this.carModel.findByIdAndRemove(id);
    return deletedCar;
  }

  async getCarsFilteredByManufacturer(
    manufactrerListDto: ManufacturerListDto
  ): Promise<any[]> {
    const manufacurerIds = manufactrerListDto.manufacurerIds.map(id =>
      Types.ObjectId(id)
    );

    const cars = await this.carModel
      .aggregate()
      .match({ manufacturer: { $nin: manufacurerIds } })
      .group({
        _id: '$manufacturer',
        cars: {
          $push: { _id: '$_id', name: '$name', year: '$year', image: '$image' }
        }
      })
      .lookup({
        from: 'manufacturers',
        localField: '_id',
        foreignField: '_id',
        as: '_id'
      })
      .unwind('_id')
      .project({
        _id: 0,
        manufacturer: {
          _id: '$_id._id',
          name: '$_id.name',
          country: '$_id.country',
          logo: '$_id.logo'
        },
        cars: '$cars'
      })
      .group({
        _id: '$manufacturer.country',
        manufacturer: {
          $push: {
            _id: '$manufacturer._id',
            name: '$manufacturer.name',
            logo: '$manufacturer.logo',
            cars: '$cars'
          }
        }
      })
      .project({
        _id: 0,
        country: '$_id',
        manufacturer: '$manufacturer'
      });

    return cars;
  }
}
