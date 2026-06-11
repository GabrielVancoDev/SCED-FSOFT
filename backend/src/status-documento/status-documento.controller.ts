import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { StatusDocumentoService } from './status-documento.service';
import { CreateStatusDocumentoDto } from './dto/create-status-documento.dto';

@Controller('status-documento')
export class StatusDocumentoController {
  constructor(
    private readonly statusDocumentoService: StatusDocumentoService,
  ) {}

  @Post()
  create(@Body() data: CreateStatusDocumentoDto) {
    return this.statusDocumentoService.create(data);
  }

  @Get()
  findAll() {
    return this.statusDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe transforma o id em number
    return this.statusDocumentoService.findOne(id); // Encontra o statusDocumento pelo id
  }
}
