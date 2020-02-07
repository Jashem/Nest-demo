import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacturer } from './interfaces/manufacturer.interface';
import { CreateManufacturerDto } from './dto/create-manufacturer-dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectModel('Manufacturer')
    private readonly manufacturerModel: Model<Manufacturer>
  ) {}

  async createManufacturer(
    createManufacturerDto: CreateManufacturerDto
  ): Promise<Manufacturer> {
    const newManufacturer = new this.manufacturerModel(createManufacturerDto);
    const savedManufacturer = await newManufacturer.save();
    return savedManufacturer;
  }

  async getAllmanufactrers(): Promise<Manufacturer[]> {
    const manufacturers = await this.manufacturerModel.find({});
    return manufacturers;
  }

  async getManufacturersByCountry(country: string): Promise<Manufacturer[]> {
    const manufacturers = await this.manufacturerModel.find({
      country: new RegExp(`^${country}$`, 'i')
    });
    return manufacturers;
  }

  async deleteManufactureByid(id: string): Promise<Manufacturer> {
    const deletedManufacturer = await this.manufacturerModel.findByIdAndRemove(
      id
    );
    return deletedManufacturer;
  }
}
