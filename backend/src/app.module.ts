import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { DepartamentosService } from './departamentos/departamentos.service';
import { DepartamentosController } from './departamentos/departamentos.controller';
import { DocumentosModule } from './documentos/documentos.module';
import { StatusDocumentoModule } from './status-documento/status-documento.module';
import { AnexosModule } from './anexos/anexos.module';
import { HistoricoDocumentoModule } from './historico-documento/historico-documento.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, DepartamentosModule, DocumentosModule, StatusDocumentoModule, AnexosModule, HistoricoDocumentoModule],
  controllers: [AppController, DepartamentosController],
  providers: [AppService, DepartamentosService],
})
export class AppModule {}
