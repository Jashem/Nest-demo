import { CreateCarDto } from './create-car-dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCarDto)
  readonly cars: CreateCarDto[];
}
