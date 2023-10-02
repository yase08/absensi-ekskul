/*
  Warnings:

  - You are about to drop the column `ekskulId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rayonId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rombelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `UserOnEkskul` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_ekskulId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rayonId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rombelId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnEkskul" DROP CONSTRAINT "UserOnEkskul_ekskulId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnEkskul" DROP CONSTRAINT "UserOnEkskul_roleId_fkey";

-- DropIndex
DROP INDEX "User_rayonId_key";

-- DropIndex
DROP INDEX "User_rombelId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ekskulId",
DROP COLUMN "rayonId",
DROP COLUMN "rombelId";

-- AlterTable
ALTER TABLE "UserOnEkskul" DROP COLUMN "roleId";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "rombelId" INTEGER NOT NULL,
    "rayonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentOnEskul" (
    "studentId" INTEGER NOT NULL,
    "ekskulId" INTEGER NOT NULL,

    CONSTRAINT "StudentOnEskul_pkey" PRIMARY KEY ("studentId","ekskulId")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "ekskulId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityProgram" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleOnEkskul" (
    "ekskulId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "ScheduleOnEkskul_pkey" PRIMARY KEY ("ekskulId","scheduleId")
);

-- CreateTable
CREATE TABLE "InstructorAttendance" (
    "id" SERIAL NOT NULL,
    "category" "CategoryAttendance" NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstructorAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rombelId_key" ON "Student"("rombelId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rayonId_key" ON "Student"("rayonId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_rombelId_fkey" FOREIGN KEY ("rombelId") REFERENCES "Rombel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_rayonId_fkey" FOREIGN KEY ("rayonId") REFERENCES "Rayon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnEskul" ADD CONSTRAINT "StudentOnEskul_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnEskul" ADD CONSTRAINT "StudentOnEskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Ekskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnEkskul" ADD CONSTRAINT "UserOnEkskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Ekskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Ekskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleOnEkskul" ADD CONSTRAINT "ScheduleOnEkskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Ekskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleOnEkskul" ADD CONSTRAINT "ScheduleOnEkskul_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorAttendance" ADD CONSTRAINT "InstructorAttendance_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
