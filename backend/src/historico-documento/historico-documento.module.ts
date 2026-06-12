import { Module } from '@nestjs/common';
import { HistoricoDocumentoController } from './historico-documento.controller';
import { HistoricoDocumentoService } from './historico-documento.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HistoricoDocumentoController],
  providers: [HistoricoDocumentoService, PrismaService],
})
export class HistoricoDocumentoModule {}
