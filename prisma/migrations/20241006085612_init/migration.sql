-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pseudo" TEXT NOT NULL,
    "classe" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "lastEtape" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CAC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guideId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "CAC_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CACItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "cacId" INTEGER NOT NULL,
    CONSTRAINT "CACItem_cacId_fkey" FOREIGN KEY ("cacId") REFERENCES "CAC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
