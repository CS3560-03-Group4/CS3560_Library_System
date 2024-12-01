/*
  Warnings:

  - A unique constraint covering the columns `[fineID]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fineID` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "fineID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_fineID_key" ON "Payment"("fineID");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_fineID_fkey" FOREIGN KEY ("fineID") REFERENCES "Fine"("fineID") ON DELETE RESTRICT ON UPDATE CASCADE;
