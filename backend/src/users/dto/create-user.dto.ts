import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum TipoUsuario {
  ADMIN = 'ADMIN',
  COMUM = 'COMUM',
  ESPECIAL = 'ESPECIAL',
}

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

  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;
}
