/*
  Warnings:

  - You are about to drop the `checkboxPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "checkboxPlayer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Cac" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cacId" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cac_cacId_key" ON "Cac"("cacId");
