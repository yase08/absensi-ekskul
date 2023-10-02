/*
  Warnings:

  - Added the required column `ekskulId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ekskulId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserOnEkskul" (
    "userId" INTEGER NOT NULL,
    "ekskulId" INTEGER NOT NULL,
    "roleId" INTEGER,

    CONSTRAINT "UserOnEkskul_pkey" PRIMARY KEY ("userId","ekskulId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Ekskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnEkskul" ADD CONSTRAINT "UserOnEkskul_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnEkskul" ADD CONSTRAINT "UserOnEkskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnEkskul" ADD CONSTRAINT "UserOnEkskul_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
