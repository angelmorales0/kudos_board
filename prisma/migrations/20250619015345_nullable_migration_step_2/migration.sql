/*
  Warnings:

  - Made the column `gif` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `message` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "boardid" DROP DEFAULT,
ALTER COLUMN "gif" SET NOT NULL,
ALTER COLUMN "message" SET NOT NULL;
