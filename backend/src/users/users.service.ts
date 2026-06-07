import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    return this.prisma.user.create({
      data: {
        ...data, // Pega todos os dados do CreateUserDto
        senha: senhaHash,
      },
    });
  }

  // Encontrar todos os usuários
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        departamento: true,
      },
    });
  }

  // Encontrar um usuário
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        departamento: true,
      },
    });
  }

  // Remover um usuário
  async remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
