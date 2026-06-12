import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { HistoricoDocumentoService } from './historico-documento.service';

@Controller('historico-documento')
export class HistoricoDocumentoController {
  constructor(
    private readonly historicoDocumentoService: HistoricoDocumentoService,
  ) {}

  @Get()
  findAll() {
    return this.historicoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historicoDocumentoService.findOne(id);
  }

  @Get('documento/:documentoId')
  findByDocumento(@Param('documentoId', ParseIntPipe) documentoId: number) {
    return this.historicoDocumentoService.findByDocumento(documentoId);
  }
}
