# LIBRARY SYSTEM - FINAL PROJECT 3650

This project aims to create an online library system that provides streamlined services for students and library staff. Students can look up materials, create a book borrowing order, renew, and return books through our system. Meanwhile, staff can manage the book catalog and process students' orders.

---

## Getting started

Run the following commands in order from your terminal on Visual Studio Code:

1. `git clone https://github.com/CS3560-03-Group4/CS3560_Library_System.git`

2. `cd CS3560_Library_System`

3. `npm install -g pnpm`

4. `pnpm i`

5. `pnpm dev`

6. Open the web app by clicking on the link `http://localhost:3000`

If successful, you should see the following page:

![image](https://github.com/user-attachments/assets/357f8486-cd30-475d-a284-701b7d1bffb7)


NOTE: Our development work will be mostly located in `/app` folder

## Database connection with Prisma

1. Install Prisma: `pnpm i -D prisma`

2. Create the folder `prisma`: `pnpx prisma init`

3. After defining all models, run `pnpx prisma generate`

4. Then run `pnpx prisma migrate dev` to create tables remotely on Neon DB
