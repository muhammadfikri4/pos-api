/*
  Warnings:

  - Added the required column `totalSold` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReturn` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "totalSold" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "totalPaid" INTEGER NOT NULL,
ADD COLUMN     "totalReturn" INTEGER NOT NULL;
