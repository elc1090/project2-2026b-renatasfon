/*
  Warnings:

  - You are about to drop the column `categoria` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "categoria",
DROP COLUMN "quantidade";

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoMaterial" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "materialId" INTEGER,
    "materialOutro" TEXT,

    CONSTRAINT "PedidoMaterial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PedidoMaterial" ADD CONSTRAINT "PedidoMaterial_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoMaterial" ADD CONSTRAINT "PedidoMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;
