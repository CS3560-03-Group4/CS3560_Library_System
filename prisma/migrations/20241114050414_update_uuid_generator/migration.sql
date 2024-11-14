-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "bookID" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "BookOrder" ALTER COLUMN "orderID" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Fine" ALTER COLUMN "fineID" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "paymentID" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userID" SET DEFAULT gen_random_uuid();
