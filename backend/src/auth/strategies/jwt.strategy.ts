import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt'; // Importação do passport-jwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Configuração do JWT

      ignoreExpiration: false, // Ignora o tempo de expiração

      secretOrKey: process.env.JWT_SECRET, // Secret key
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      tipoUsuario: payload.tipoUsuario,
    };
  }
}

/*O que isso faz?

Agora o Nest:
✅ lê token JWT
✅ valida assinatura
✅ verifica expiração
✅ extrai usuário */
