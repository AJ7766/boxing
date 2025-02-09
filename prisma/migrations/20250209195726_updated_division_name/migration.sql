/*
  Warnings:

  - You are about to drop the column `divisionName` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `divisionName` on the `Fighter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "divisionName",
ADD COLUMN     "division" TEXT;

-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "divisionName",
ADD COLUMN     "division" TEXT;
