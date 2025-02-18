/*
  Warnings:

  - You are about to drop the `Broadcaster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FightBroadcasters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fight" DROP CONSTRAINT "Fight_resultId_fkey";

-- DropForeignKey
ALTER TABLE "_FightBroadcasters" DROP CONSTRAINT "_FightBroadcasters_A_fkey";

-- DropForeignKey
ALTER TABLE "_FightBroadcasters" DROP CONSTRAINT "_FightBroadcasters_B_fkey";

-- AlterTable
ALTER TABLE "Fight" ADD COLUMN     "broadcasters" JSONB,
ADD COLUMN     "result" JSONB;

-- DropTable
DROP TABLE "Broadcaster";

-- DropTable
DROP TABLE "Result";

-- DropTable
DROP TABLE "_FightBroadcasters";
