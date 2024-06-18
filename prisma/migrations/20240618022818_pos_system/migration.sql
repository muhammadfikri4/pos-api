/*
  Warnings:

  - Added the required column `customer_email` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "customer_email" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL;
