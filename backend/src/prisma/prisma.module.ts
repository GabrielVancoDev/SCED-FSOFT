import { Module } from '@nestjs/common'; // Import the Module decorator
import { PrismaService } from './prisma.service'; // Import the PrismaService

// Define o PrismaModule
@Module({
  providers: [PrismaService], // Define o PrismaService como um provider
  exports: [PrismaService], // Exporta o PrismaService
})

// Exporta o PrismaModule para ser utilizado em outros módulos
export class PrismaModule {}
