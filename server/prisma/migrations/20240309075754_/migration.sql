/*
  Warnings:

  - You are about to drop the column `dateBirth` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_User" ("description", "id", "name", "nickName", "password") SELECT "description", "id", "name", "nickName", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
