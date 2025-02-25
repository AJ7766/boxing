/*
  Warnings:

  - You are about to drop the column `divisionSlug` on the `Fighter` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Fighter` table. All the data in the column will be lost.
  - You are about to drop the column `titleNames` on the `Fighter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fighter" DROP COLUMN "divisionSlug",
DROP COLUMN "gender",
DROP COLUMN "titleNames";
