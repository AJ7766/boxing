/*
  Warnings:

  - You are about to drop the column `name` on the `Broadcaster` table. All the data in the column will be lost.
  - You are about to drop the column `divisionWeightKg` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `divisionWeightLb` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `eventLocation` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `eventSlug` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `eventTitle` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `results` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Fight` table. All the data in the column will be lost.
  - The `scores` column on the `Fight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[resultId]` on the table `Fight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `network` to the `Broadcaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Broadcaster" DROP COLUMN "name",
ADD COLUMN     "network" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "divisionWeightKg",
DROP COLUMN "divisionWeightLb",
DROP COLUMN "eventDate",
DROP COLUMN "eventLocation",
DROP COLUMN "eventSlug",
DROP COLUMN "eventTitle",
DROP COLUMN "results",
DROP COLUMN "slug",
ADD COLUMN     "resultId" TEXT,
DROP COLUMN "scores",
ADD COLUMN     "scores" TEXT[];

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "round" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fight_resultId_key" ON "Fight"("resultId");

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
