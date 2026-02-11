/*
  Warnings:

  - You are about to drop the column `createAt` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `currentWorkingPlace` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentWorkingPlace" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
