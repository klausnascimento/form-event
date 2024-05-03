/*
  Warnings:

  - You are about to drop the column `files` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "files",
DROP COLUMN "image";
