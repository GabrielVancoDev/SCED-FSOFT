import { Module } from '@nestjs/common';
import { StatusDocumentoController } from './status-documento.controller';
import { StatusDocumentoService } from './status-documento.service';

@Module({
  controllers: [StatusDocumentoController],
  providers: [StatusDocumentoService]
})
export class StatusDocumentoModule {}
