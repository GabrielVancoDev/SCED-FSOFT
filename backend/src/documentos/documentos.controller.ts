import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';

import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateStatusDocumentoDto } from './dto/update-status-documento.dto';
import { Response } from 'express';
import { join } from 'path';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() data: CreateDocumentoDto) {
    return this.documentosService.create(data);
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentosService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateStatusDocumentoDto,
  ) {
    return this.documentosService.updateStatus(id, data);
  }
}
