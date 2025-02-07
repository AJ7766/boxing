/*
  Warnings:

  - You are about to drop the column `fighter1Id` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter1Name` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter1Winner` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter2Id` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter2Name` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter2Winner` on the `Fight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "fighter1Id",
DROP COLUMN "fighter1Name",
DROP COLUMN "fighter1Winner",
DROP COLUMN "fighter2Id",
DROP COLUMN "fighter2Name",
DROP COLUMN "fighter2Winner",
ADD COLUMN     "fighter1" JSONB,
ADD COLUMN     "fighter2" JSONB;
