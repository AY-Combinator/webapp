/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "module_prerequisites" DROP CONSTRAINT "module_prerequisites_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "module_prerequisites" DROP CONSTRAINT "module_prerequisites_prerequisiteId_fkey";

-- DropForeignKey
ALTER TABLE "project_progress" DROP CONSTRAINT "project_progress_moduleId_fkey";

-- DropTable
DROP TABLE "Module";

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" "ModuleDifficulty" NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modules_order_key" ON "modules"("order");

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_prerequisites" ADD CONSTRAINT "module_prerequisites_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_prerequisites" ADD CONSTRAINT "module_prerequisites_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_progress" ADD CONSTRAINT "project_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
