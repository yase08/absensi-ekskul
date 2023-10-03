/*
  Warnings:

  - You are about to drop the `Ekskul` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_ekskulId_fkey";

-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_ekskulId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnEskul" DROP CONSTRAINT "StudentOnEskul_ekskulId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnEkskul" DROP CONSTRAINT "UserOnEkskul_ekskulId_fkey";

-- DropTable
DROP TABLE "Ekskul";

-- CreateTable
CREATE TABLE "Eskul" (
    "id" SERIAL NOT NULL,
    "category" "CategoryEkskul" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eskul_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Eskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Eskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnEskul" ADD CONSTRAINT "StudentOnEskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Eskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnEkskul" ADD CONSTRAINT "UserOnEkskul_ekskulId_fkey" FOREIGN KEY ("ekskulId") REFERENCES "Eskul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
