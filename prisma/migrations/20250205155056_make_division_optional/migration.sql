/*
  Warnings:

  - You are about to drop the column `divisionId` on the `Fighter` table. All the data in the column will be lost.
  - You are about to drop the `Broadcaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Division` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FightResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FighterTitle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fighters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Broadcaster" DROP CONSTRAINT "Broadcaster_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Fight" DROP CONSTRAINT "Fight_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "Fight" DROP CONSTRAINT "Fight_eventId_fkey";

-- DropForeignKey
ALTER TABLE "FightResult" DROP CONSTRAINT "FightResult_fightId_fkey";

-- DropForeignKey
ALTER TABLE "Fighter" DROP CONSTRAINT "Fighter_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "FighterTitle" DROP CONSTRAINT "FighterTitle_fighterId_fkey";

-- DropForeignKey
ALTER TABLE "Fighters" DROP CONSTRAINT "Fighters_fightId_fkey";

-- DropForeignKey
ALTER TABLE "Fighters" DROP CONSTRAINT "Fighters_fighter1Id_fkey";

-- DropForeignKey
ALTER TABLE "Fighters" DROP CONSTRAINT "Fighters_fighter2Id_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_fighterId_fkey";

-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "divisionId",
ADD COLUMN     "divisionName" TEXT,
ADD COLUMN     "divisionSlug" TEXT,
ADD COLUMN     "draws" INTEGER,
ADD COLUMN     "ko_percentage" INTEGER,
ADD COLUMN     "ko_wins" INTEGER,
ADD COLUMN     "losses" INTEGER,
ADD COLUMN     "stopped" INTEGER,
ADD COLUMN     "titleNames" JSONB,
ADD COLUMN     "total_bouts" INTEGER,
ADD COLUMN     "total_rounds" INTEGER,
ADD COLUMN     "weightKg" DOUBLE PRECISION,
ADD COLUMN     "weightLb" DOUBLE PRECISION,
ADD COLUMN     "wins" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "reach" DROP NOT NULL,
ALTER COLUMN "stance" DROP NOT NULL,
ALTER COLUMN "debut" DROP NOT NULL;

-- DropTable
DROP TABLE "Broadcaster";

-- DropTable
DROP TABLE "Division";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Fight";

-- DropTable
DROP TABLE "FightResult";

-- DropTable
DROP TABLE "FighterTitle";

-- DropTable
DROP TABLE "Fighters";

-- DropTable
DROP TABLE "Stats";

-- DropEnum
DROP TYPE "EventStatus";
