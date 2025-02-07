/*
  Warnings:

  - You are about to drop the column `fighter1` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighter2` on the `Fight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "fighter1",
DROP COLUMN "fighter2",
ADD COLUMN     "fighter1Id" TEXT,
ADD COLUMN     "fighter2Id" TEXT;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_fighter1Id_fkey" FOREIGN KEY ("fighter1Id") REFERENCES "Fighter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_fighter2Id_fkey" FOREIGN KEY ("fighter2Id") REFERENCES "Fighter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
