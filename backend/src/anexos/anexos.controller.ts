import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Res,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { AnexosService } from './anexos.service';
import type { Response } from 'express';
@Controller('anexos')
export class AnexosController {
  constructor(private readonly anexosService: AnexosService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('arquivo', {
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('documentoId') documentoId: string,
  ) {
    console.log('ARQUIVO:', file);
    console.log('DOCUMENTO ID:', documentoId);

    return this.anexosService.create(Number(documentoId), file);
  }

  @Get()
  findAll() {
    return this.anexosService.findAll();
  }

  @Get('download/:id')
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const anexo = await this.anexosService.findOne(id);

    if (!anexo) {
      return res.status(404).json({
        message: 'Anexo não encontrado',
      });
    }

    const filePath = join(process.cwd(), 'uploads', anexo.caminhoArquivo);

    return res.download(filePath, anexo.nomeArquivo);
  }
}
