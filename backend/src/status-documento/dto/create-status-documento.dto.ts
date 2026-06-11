import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDocumentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  descricao?: string;
}
