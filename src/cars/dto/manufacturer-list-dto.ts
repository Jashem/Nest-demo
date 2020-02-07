import { IsNotEmpty, IsArray } from 'class-validator';

export class ManufacturerListDto {
  @IsNotEmpty()
  @IsArray()
  readonly manufacurerIds: string[];
}
