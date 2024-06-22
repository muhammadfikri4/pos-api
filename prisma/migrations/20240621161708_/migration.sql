/*
  Warnings:

  - You are about to alter the column `nominal` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[serialNumber]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "nominal" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_serialNumber_key" ON "Transaction"("serialNumber");
