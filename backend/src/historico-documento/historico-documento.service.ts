// Este serviço é para trabalhar com o historico do documento
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoricoDocumentoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.historicoDocumento.findMany({
      include: {
        documento: true,
        usuario: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.historicoDocumento.findUnique({
      where: {
        id,
      },
      include: {
        documento: true,
        usuario: true,
      },
    });
  }

  async findByDocumento(documentoId: number) {
    return this.prisma.historicoDocumento.findMany({
      where: {
        documentoId,
      },
      include: {
        usuario: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
