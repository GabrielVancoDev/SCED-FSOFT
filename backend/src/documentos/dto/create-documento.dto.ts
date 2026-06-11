import { IsInt, IsNotEmpty, IsString } from 'class-validator'; // importação de validações

export class CreateDocumentoDto {
  @IsString()
  @IsNotEmpty()
  numeroProtocolo: string; 

  @IsString()
  @IsNotEmpty()
  assunto: string;

  @IsString()
  descricao?: string;

  @IsInt()
  usuarioId: number;

  @IsInt()
  departamentoId: number;

  @IsInt()
  statusId: number;
}
