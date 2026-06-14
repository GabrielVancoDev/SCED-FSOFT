import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDocumentoDto {
  @IsInt()
  statusId: number;

  @IsInt()
  usuarioId: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}
