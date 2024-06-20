-- AlterEnum
ALTER TYPE "StatusTransaction" ADD VALUE 'PROCESS_BY_KITCHEN';

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "status" "StatusTransaction" NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_id_key" ON "History"("id");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
