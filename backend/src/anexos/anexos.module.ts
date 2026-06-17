import { Module } from '@nestjs/common';

import { AnexosController } from './anexos.controller';
import { AnexosService } from './anexos.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AnexosController],
  providers: [AnexosService, PrismaService],
})
export class AnexosModule {}
