/*
  Warnings:

  - The primary key for the `MensRankings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WomensRankings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MensRankings" DROP CONSTRAINT "MensRankings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MensRankings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MensRankings_id_seq";

-- AlterTable
ALTER TABLE "WomensRankings" DROP CONSTRAINT "WomensRankings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WomensRankings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WomensRankings_id_seq";
