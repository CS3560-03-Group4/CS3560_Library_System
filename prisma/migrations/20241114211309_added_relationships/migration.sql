/*
  Warnings:

  - A unique constraint covering the columns `[bookOrderID]` on the table `Fine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentID` to the `BookOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookOrderID` to the `Fine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookItem" DROP CONSTRAINT "BookItem_bookID_fkey";

-- DropForeignKey
ALTER TABLE "BookItem" DROP CONSTRAINT "BookItem_orderID_fkey";

-- AlterTable
ALTER TABLE "BookOrder" ADD COLUMN     "studentID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fine" ADD COLUMN     "bookOrderID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "studentID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fine_bookOrderID_key" ON "Fine"("bookOrderID");

-- AddForeignKey
ALTER TABLE "BookOrder" ADD CONSTRAINT "BookOrder_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "BookOrder"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("bookID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_bookOrderID_fkey" FOREIGN KEY ("bookOrderID") REFERENCES "BookOrder"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE CASCADE ON UPDATE CASCADE;
