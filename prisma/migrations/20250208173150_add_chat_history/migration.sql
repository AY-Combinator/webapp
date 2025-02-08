/*
  Warnings:

  - You are about to drop the column `agentId` on the `modules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "chatHistory" JSONB;
