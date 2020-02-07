import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateManufacturerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  @IsUrl()
  readonly logo: string;
}
