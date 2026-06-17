import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { AnexosService } from './anexos.service';

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
}
