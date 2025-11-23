-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "screenshots" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Game_category_idx" ON "Game"("category");

-- CreateIndex
CREATE INDEX "Game_isNew_idx" ON "Game"("isNew");

-- CreateIndex
CREATE INDEX "Game_isTrending_idx" ON "Game"("isTrending");

-- CreateIndex
CREATE INDEX "Review_gameId_idx" ON "Review"("gameId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_approved_idx" ON "Review"("approved");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
