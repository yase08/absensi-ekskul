/*
  Warnings:

  - Made the column `date` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" SET NOT NULL;
