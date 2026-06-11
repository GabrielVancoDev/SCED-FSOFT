import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatusDocumentoDto } from './dto/create-status-documento.dto';

@Injectable()
export class StatusDocumentoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStatusDocumentoDto) {
    return this.prisma.statusDocumento.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.statusDocumento.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.statusDocumento.findUnique({
      where: {
        id,
      },
    });
  }
}
