/*
  Warnings:

  - A unique constraint covering the columns `[userId,type,label]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Label_userId_type_label_key" ON "Label"("userId", "type", "label");
