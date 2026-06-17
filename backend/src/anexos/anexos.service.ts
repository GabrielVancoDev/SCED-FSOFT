import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnexosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(documentoId: number, file: Express.Multer.File) {
    return this.prisma.anexo.create({
      data: {
        documentoId,

        nomeArquivo: file.originalname,

        caminhoArquivo: file.filename,
      },
    });
  }
// Encontrar todos os anexos
  async findAll() {
    return this.prisma.anexo.findMany({
      include: {
        documento: true,
      },
    });
  }
  // Encontrar um anexo
  async findOne(id: number) {
    return this.prisma.anexo.findUnique({
      where: {
        id,
      },
    });
  }
}
