-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "classe" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "lastEtape" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "checkboxPlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cacId" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "checkboxPlayer_cacId_key" ON "checkboxPlayer"("cacId");
