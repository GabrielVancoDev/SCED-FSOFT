import { IsInt } from 'class-validator';

export class CreateAnexoDto {
  @IsInt()
  documentoId: number;
}
