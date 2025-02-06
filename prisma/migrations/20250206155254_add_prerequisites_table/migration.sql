/*
  Warnings:

  - You are about to drop the `_ModulePrerequisites` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ModulePrerequisites" DROP CONSTRAINT "_ModulePrerequisites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModulePrerequisites" DROP CONSTRAINT "_ModulePrerequisites_B_fkey";

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ModulePrerequisites";

-- CreateTable
CREATE TABLE "module_prerequisites" (
    "moduleId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "module_prerequisites_moduleId_prerequisiteId_key" ON "module_prerequisites"("moduleId", "prerequisiteId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_order_key" ON "Module"("order");

-- AddForeignKey
ALTER TABLE "module_prerequisites" ADD CONSTRAINT "module_prerequisites_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_prerequisites" ADD CONSTRAINT "module_prerequisites_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
