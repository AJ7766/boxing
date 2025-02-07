-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Broadcaster" (
    "id" TEXT NOT NULL,
    "broadcasters" JSONB NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Broadcaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weightLb" INTEGER,
    "weightKg" INTEGER,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FighterStats" (
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

    CONSTRAINT "FighterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FighterTitle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fighterId" TEXT NOT NULL,

    CONSTRAINT "FighterTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fighter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT,
    "height" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "nickname" TEXT,
    "reach" TEXT NOT NULL,
    "stance" TEXT NOT NULL,
    "debut" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,

    CONSTRAINT "Fighter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightsFighterStats" (
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

    CONSTRAINT "FightsFighterStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightsFighters" (
    "id" TEXT NOT NULL,
    "fightId" TEXT NOT NULL,
    "fighter1Id" TEXT NOT NULL,
    "fighter2Id" TEXT NOT NULL,

    CONSTRAINT "FightsFighters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightsFighter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "reach" TEXT NOT NULL,
    "stance" TEXT NOT NULL,
    "debut" TEXT NOT NULL,
    "fightsFighterStatsId" TEXT,

    CONSTRAINT "FightsFighter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "scheduledRounds" INTEGER NOT NULL,
    "scores" TEXT[],
    "status" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightResult" (
    "id" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "round" TEXT NOT NULL,
    "fightId" TEXT NOT NULL,

    CONSTRAINT "FightResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FighterStats_fighterId_key" ON "FighterStats"("fighterId");

-- CreateIndex
CREATE UNIQUE INDEX "FightsFighterStats_fighterId_key" ON "FightsFighterStats"("fighterId");

-- CreateIndex
CREATE UNIQUE INDEX "FightsFighters_fightId_key" ON "FightsFighters"("fightId");

-- CreateIndex
CREATE UNIQUE INDEX "FightResult_fightId_key" ON "FightResult"("fightId");

-- AddForeignKey
ALTER TABLE "Broadcaster" ADD CONSTRAINT "Broadcaster_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FighterStats" ADD CONSTRAINT "FighterStats_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FighterTitle" ADD CONSTRAINT "FighterTitle_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fighter" ADD CONSTRAINT "Fighter_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightsFighterStats" ADD CONSTRAINT "FightsFighterStats_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "FightsFighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightsFighters" ADD CONSTRAINT "FightsFighters_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightsFighters" ADD CONSTRAINT "FightsFighters_fighter1Id_fkey" FOREIGN KEY ("fighter1Id") REFERENCES "FightsFighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightsFighters" ADD CONSTRAINT "FightsFighters_fighter2Id_fkey" FOREIGN KEY ("fighter2Id") REFERENCES "FightsFighter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightResult" ADD CONSTRAINT "FightResult_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
