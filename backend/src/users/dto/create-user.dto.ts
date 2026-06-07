import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { TipoUsuario } from '../../common/enums/tipo-usuario.enum';
import { IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsInt()
  departamentoId: number;

  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;
}
