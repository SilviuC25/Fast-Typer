/*
  Warnings:

  - Added the required column `difficulty` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;
