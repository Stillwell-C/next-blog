/*
  Warnings:

  - You are about to drop the column `imgURL` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgURL",
ADD COLUMN     "imgUrl" TEXT;
