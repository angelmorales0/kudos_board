-- CreateEnum
CREATE TYPE "BoardCategory" AS ENUM ('CELEBRATION', 'THANK_YOU', 'INSPIRATION');

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "category" "BoardCategory" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "Message" TEXT NOT NULL,
    "Gif" TEXT NOT NULL,
    "Author" TEXT,
    "Upvotes" INTEGER NOT NULL DEFAULT 0,
    "boardID" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
