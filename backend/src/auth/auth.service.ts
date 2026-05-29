import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Injeção de dependência
    private jwtService: JwtService, //
  ) {}

  // Login do usuário
  async login(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email); // Busca o usuário pelo email

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado'); // Caso o usuário não seja encontrado
    }

    const senhaValida = await bcrypt.compare(senha, user.senha); // Validação da senha

    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida'); // Caso a senha seja inválida
    }

    // Cria o token
    const payload = {
      sub: user.id,
      email: user.email,
      tipoUsuario: user.tipoUsuario,
    };

    return {
      access_token: this.jwtService.sign(payload), // Retorna o token

      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }
}
