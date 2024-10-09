/*
  Warnings:

  - The `oAuthProviderId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "oAuthProviderId",
ADD COLUMN     "oAuthProviderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_oAuthProviderId_key" ON "User"("oAuthProviderId");
