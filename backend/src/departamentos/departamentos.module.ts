import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { DepartamentosController } from './departamentos.controller';
import { DepartamentosService } from './departamentos.service';

@Module({
  imports: [PrismaModule],
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  exports: [DepartamentosService],
})
export class DepartamentosModule {}
