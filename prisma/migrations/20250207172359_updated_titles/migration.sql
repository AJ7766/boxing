/*
  Warnings:

  - You are about to drop the column `titleNames` on the `Fight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fight" DROP COLUMN "titleNames";

-- CreateTable
CREATE TABLE "Titles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FightTitles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FightTitles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FightTitles_B_index" ON "_FightTitles"("B");

-- AddForeignKey
ALTER TABLE "_FightTitles" ADD CONSTRAINT "_FightTitles_A_fkey" FOREIGN KEY ("A") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FightTitles" ADD CONSTRAINT "_FightTitles_B_fkey" FOREIGN KEY ("B") REFERENCES "Titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
