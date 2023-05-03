-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromId" TEXT,
ADD COLUMN     "toId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
