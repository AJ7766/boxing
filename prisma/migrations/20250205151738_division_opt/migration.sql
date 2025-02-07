/*
  Warnings:

  - You are about to drop the `FighterStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FightsFighter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FightsFighterStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FightsFighters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FighterStats" DROP CONSTRAINT "FighterStats_fighterId_fkey";

-- DropForeignKey
ALTER TABLE "FightsFighterStats" DROP CONSTRAINT "FightsFighterStats_fighterId_fkey";

-- DropForeignKey
ALTER TABLE "FightsFighters" DROP CONSTRAINT "FightsFighters_fightId_fkey";

-- DropForeignKey
ALTER TABLE "FightsFighters" DROP CONSTRAINT "FightsFighters_fighter1Id_fkey";

-- DropForeignKey
ALTER TABLE "FightsFighters" DROP CONSTRAINT "FightsFighters_fighter2Id_fkey";

-- DropTable
DROP TABLE "FighterStats";

-- DropTable
DROP TABLE "FightsFighter";

-- DropTable
DROP TABLE "FightsFighterStats";

-- DropTable
DROP TABLE "FightsFighters";

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "totalBouts" INTEGER NOT NULL,
    "totalRounds" INTEGER NOT NULL,
    "koPercentage" DOUBLE PRECISION NOT NULL,
    "koWins" INTEGER NOT NULL,
    "stopped" INTEGER NOT NULL,
    "fighterId" TEXT NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fighters" (
    "id" TEXT NOT NULL,
    "fightId" TEXT NOT NULL,
    "fighter1Id" TEXT NOT NULL,
    "fighter2Id" TEXT NOT NULL,

    CONSTRAINT "Fighters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_fighterId_key" ON "Stats"("fighterId");

-- CreateIndex
CREATE UNIQUE INDEX "Fighters_fightId_key" ON "Fighters"("fightId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fighters" ADD CONSTRAINT "Fighters_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fighters" ADD CONSTRAINT "Fighters_fighter1Id_fkey" FOREIGN KEY ("fighter1Id") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fighters" ADD CONSTRAINT "Fighters_fighter2Id_fkey" FOREIGN KEY ("fighter2Id") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
