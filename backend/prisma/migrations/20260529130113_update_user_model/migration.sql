-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "departamentoId" INTEGER,
ADD COLUMN     "ultimoLogin" TIMESTAMP(3);
