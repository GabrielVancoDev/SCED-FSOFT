import { IsEmail, IsString, MinLength } from 'class-validator'; // importação de validações

// definição de validações
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}
