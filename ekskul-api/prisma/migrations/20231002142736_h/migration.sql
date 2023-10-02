/*
  Warnings:

  - You are about to drop the column `berak` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `tai` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "berak",
DROP COLUMN "tai";
