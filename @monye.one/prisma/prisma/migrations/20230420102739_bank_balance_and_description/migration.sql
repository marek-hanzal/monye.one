/*
  Warnings:

  - The `params` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bank" ADD COLUMN     "balanceDate" TIMESTAMP(3),
ADD COLUMN     "balanceValue" DECIMAL(16,2),
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "params",
ADD COLUMN     "params" JSONB;

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_text_key" ON "Keyword"("text");
