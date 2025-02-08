/*
  Warnings:

  - You are about to drop the `Titles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FightTitles" DROP CONSTRAINT "_FightTitles_B_fkey";

-- DropTable
DROP TABLE "Titles";

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_FightTitles" ADD CONSTRAINT "_FightTitles_B_fkey" FOREIGN KEY ("B") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;
