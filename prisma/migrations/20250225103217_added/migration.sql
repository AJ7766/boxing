-- AlterTable
ALTER TABLE "Title" ADD COLUMN     "fighterId" TEXT;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_fighterId_fkey" FOREIGN KEY ("fighterId") REFERENCES "Fighter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
