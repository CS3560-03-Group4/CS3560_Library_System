-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'STAFF');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'ORDERED', 'RETURNED', 'CANCELED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "FineStatus" AS ENUM ('PAID', 'UNPAID', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "major" TEXT,
    "amountDue" DOUBLE PRECISION,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffID" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3),
    "position" TEXT,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffID")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "datePublished" TIMESTAMP(3),
    "description" TEXT,
    "imageURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookID")
);

-- CreateTable
CREATE TABLE "BookInventory" (
    "bookID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookInventory_pkey" PRIMARY KEY ("bookID")
);

-- CreateTable
CREATE TABLE "BookOrder" (
    "orderID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "totalItems" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "studentID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookOrder_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "BookItem" (
    "orderID" TEXT NOT NULL,
    "bookID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookItem_pkey" PRIMARY KEY ("orderID","bookID")
);

-- CreateTable
CREATE TABLE "Fine" (
    "fineID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "FineStatus" NOT NULL,
    "orderID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("fineID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "paymentMethod" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "studentID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userID_key" ON "Staff"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "BookInventory_bookID_key" ON "BookInventory"("bookID");

-- CreateIndex
CREATE UNIQUE INDEX "Fine_orderID_key" ON "Fine"("orderID");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookInventory" ADD CONSTRAINT "BookInventory_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("bookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOrder" ADD CONSTRAINT "BookOrder_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "BookOrder"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("bookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "BookOrder"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
