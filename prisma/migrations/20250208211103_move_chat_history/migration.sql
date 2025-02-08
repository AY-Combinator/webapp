/*
  Warnings:

  - You are about to drop the column `chatHistory` on the `modules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "modules" DROP COLUMN "chatHistory",
ALTER COLUMN "agentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_progress" ADD COLUMN     "chatHistory" JSONB[];
