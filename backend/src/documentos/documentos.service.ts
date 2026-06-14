import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateStatusDocumentoDto } from './dto/update-status-documento.dto';

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
  async updateStatus(documentoId: number, data: UpdateStatusDocumentoDto) {
    // Buscar documento atual
    const documento = await this.prisma.documento.findUnique({
      where: {
        id: documentoId,
      },
      include: {
        status: true,
      },
    });

    if (!documento) {
      throw new Error('Documento não encontrado');
    }

    // Buscar novo status
    const novoStatus = await this.prisma.statusDocumento.findUnique({
      where: {
        id: data.statusId,
      },
    });

    if (!novoStatus) {
      throw new Error('Status não encontrado');
    }

    // Atualizar documento
    const documentoAtualizado = await this.prisma.documento.update({
      where: {
        id: documentoId,
      },
      data: {
        statusId: data.statusId,
      },
      include: {
        usuario: true,
        departamento: true,
        status: true,
      },
    });

    // Criar histórico
    await this.prisma.historicoDocumento.create({
      data: {
        documentoId: documento.id,
        usuarioId: data.usuarioId,

        statusAnterior: documento.status.nome,

        statusNovo: novoStatus.nome,

        observacao:
          data.observacao || `Status alterado para ${novoStatus.nome}`,
      },
    });

    return documentoAtualizado;
  }
}
