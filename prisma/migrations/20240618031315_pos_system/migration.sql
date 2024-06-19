/*
  Warnings:

  - Changed the type of `number_phone` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "number_phone",
ADD COLUMN     "number_phone" INTEGER NOT NULL;
