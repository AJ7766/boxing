/*
  Warnings:

  - You are about to drop the column `bwAA` on the `MensRankings` table. All the data in the column will be lost.
  - You are about to drop the column `tbrB` on the `MensRankings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MensRankings" RENAME COLUMN "bwAA" TO "bwaa";
ALTER TABLE "MensRankings" RENAME COLUMN "tbrB" TO "tbrb";

