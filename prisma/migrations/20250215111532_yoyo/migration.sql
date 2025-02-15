/*
  Warnings:

  - You are about to drop the `MensRanking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WomensRanking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MensRanking";

-- DropTable
DROP TABLE "WomensRanking";

-- CreateTable
CREATE TABLE "MensRankings" (
    "id" SERIAL NOT NULL,
    "boxer" TEXT,
    "record" TEXT,
    "weightClass" TEXT,
    "currentWorldTitles" TEXT,
    "theRing" TEXT,
    "bwAA" TEXT,
    "tbrB" TEXT,
    "espn" TEXT,
    "boxRec" TEXT,

    CONSTRAINT "MensRankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WomensRankings" (
    "id" SERIAL NOT NULL,
    "boxer" TEXT,
    "record" TEXT,
    "weightClass" TEXT,
    "currentWorldTitles" TEXT,
    "theRing" TEXT,
    "espn" TEXT,
    "boxRec" TEXT,

    CONSTRAINT "WomensRankings_pkey" PRIMARY KEY ("id")
);
