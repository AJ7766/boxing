-- DropForeignKey
ALTER TABLE "Fighter" DROP CONSTRAINT "Fighter_divisionId_fkey";

-- AlterTable
ALTER TABLE "Fighter" ALTER COLUMN "divisionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Fighter" ADD CONSTRAINT "Fighter_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;
