-- CreateTable
CREATE TABLE "TransactionKeyword" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,

    CONSTRAINT "TransactionKeyword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionKeyword" ADD CONSTRAINT "TransactionKeyword_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionKeyword" ADD CONSTRAINT "TransactionKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
