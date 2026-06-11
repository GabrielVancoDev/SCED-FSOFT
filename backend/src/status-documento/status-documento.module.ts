import { Module } from '@nestjs/common';
import { StatusDocumentoController } from './status-documento.controller';
import { StatusDocumentoService } from './status-documento.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StatusDocumentoController],
  providers: [StatusDocumentoService, PrismaService],
})
export class StatusDocumentoModule {}
