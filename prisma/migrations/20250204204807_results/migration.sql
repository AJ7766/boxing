/*
  Warnings:

  - Changed the type of `round` on the `FightResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FightResult" DROP COLUMN "round",
ADD COLUMN     "round" INTEGER NOT NULL;
