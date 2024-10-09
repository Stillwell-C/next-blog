/*
  Warnings:

  - A unique constraint covering the columns `[oAuthProviderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "oAuthProviderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_oAuthProviderId_key" ON "User"("oAuthProviderId");
