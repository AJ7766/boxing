/*
  Warnings:

  - You are about to drop the column `resultId` on the `Fight` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Fight_resultId_key";

-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "resultId";
