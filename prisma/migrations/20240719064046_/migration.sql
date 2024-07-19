/*
  Warnings:

  - The values [PROCESS_BY_KITCHEN] on the enum `StatusTransaction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTransaction_new" AS ENUM ('PAID', 'UNPAID', 'CANCEL');
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "StatusTransaction_new" USING ("status"::text::"StatusTransaction_new");
ALTER TABLE "History" ALTER COLUMN "status" TYPE "StatusTransaction_new" USING ("status"::text::"StatusTransaction_new");
ALTER TYPE "StatusTransaction" RENAME TO "StatusTransaction_old";
ALTER TYPE "StatusTransaction_new" RENAME TO "StatusTransaction";
DROP TYPE "StatusTransaction_old";
COMMIT;
