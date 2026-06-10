import { Module } from '@nestjs/common';
import { HistoricoDocumentoController } from './historico-documento.controller';
import { HistoricoDocumentoService } from './historico-documento.service';

@Module({
  controllers: [HistoricoDocumentoController],
  providers: [HistoricoDocumentoService]
})
export class HistoricoDocumentoModule {}
