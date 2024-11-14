-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'STAFF');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'ORDERED', 'BORROWED', 'RETURNED', 'RENEWED', 'CANCELED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "FineStatus" AS ENUM ('PAID', 'UNPAID', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "major" TEXT,
    "amountDue" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffID")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookID")
);

-- CreateTable
CREATE TABLE "BookOrder" (
    "orderID" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookOrder_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "BookItem" (
    "orderID" TEXT NOT NULL,
    "bookID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BookItem_pkey" PRIMARY KEY ("orderID","bookID")
);

-- CreateTable
CREATE TABLE "Fine" (
    "fineID" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "FineStatus" NOT NULL,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("fineID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentID" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

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

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "BookOrder"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("bookID") ON DELETE RESTRICT ON UPDATE CASCADE;
