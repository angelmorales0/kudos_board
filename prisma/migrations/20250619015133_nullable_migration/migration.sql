/*
  Warnings:

  - You are about to drop the column `Author` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Gif` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Upvotes` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `boardID` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boardID_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "Author",
DROP COLUMN "Gif",
DROP COLUMN "Message",
DROP COLUMN "Upvotes",
DROP COLUMN "boardID",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "boardid" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "gif" TEXT,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardid_fkey" FOREIGN KEY ("boardid") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
