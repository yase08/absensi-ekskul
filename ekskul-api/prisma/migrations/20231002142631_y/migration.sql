/*
  Warnings:

  - Added the required column `berak` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tai` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "berak" TEXT NOT NULL,
ADD COLUMN     "tai" INTEGER NOT NULL;
