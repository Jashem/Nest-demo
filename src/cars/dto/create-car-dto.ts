import { IsNotEmpty, IsNumber, IsMongoId, IsUrl } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly manufacturer: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
