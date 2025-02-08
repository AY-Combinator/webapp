/*
  Warnings:

  - Added the required column `agentId` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "agentId" TEXT NOT NULL;
