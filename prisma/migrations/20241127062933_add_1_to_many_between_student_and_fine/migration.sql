-- AlterTable
ALTER TABLE "Fine" ADD COLUMN     "studentID" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
