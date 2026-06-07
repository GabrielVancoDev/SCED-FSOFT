import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateDepartamentoDto } from './dto/create-departamento.dto';

@Injectable()
export class DepartamentosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDepartamentoDto) {
    return this.prisma.departamento.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.departamento.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const departamento = await this.prisma.departamento.findUnique({
      where: { id },
    });

    if (!departamento) {
      throw new NotFoundException('Departamento não encontrado');
    }

    return departamento;
  }
}
