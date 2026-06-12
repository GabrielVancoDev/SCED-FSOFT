import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@Injectable()
export class DocumentosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDocumentoDto) {
    const documento = await this.prisma.documento.create({
      data,
      include: {
        usuario: true,
        departamento: true,
        status: true,
      },
    });

    const status = await this.prisma.statusDocumento.findUnique({
      where: {
        id: data.statusId,
      },
    });

    await this.prisma.historicoDocumento.create({
      data: {
        documentoId: documento.id,
        usuarioId: data.usuarioId,

        statusAnterior: null,

        statusNovo: status?.nome || 'PENDENTE',

        observacao: 'Documento criado no sistema',
      },
    });

    return documento;
  }

  async findAll() {
    return this.prisma.documento.findMany({
      include: {
        usuario: true,
        departamento: true,
        status: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.documento.findUnique({
      where: {
        id,
      },
      include: {
        usuario: true,
        departamento: true,
        status: true,
        anexos: true,
        historicos: true,
      },
    });
  }
}
