/*
  Warnings:

  - A unique constraint covering the columns `[pedidoId,doadorId]` on the table `Interesse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interesse_pedidoId_doadorId_key" ON "Interesse"("pedidoId", "doadorId");
