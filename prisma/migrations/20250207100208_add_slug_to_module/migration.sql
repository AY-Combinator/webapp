/*
  Warnings:

  - Added the required column `slug` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "slug" TEXT NOT NULL;
