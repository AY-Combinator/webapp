-- CreateEnum
CREATE TYPE "ModuleDifficulty" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "long_description" TEXT,
ADD COLUMN     "short_description" TEXT;

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" "ModuleDifficulty" NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_progress" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "project_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModulePrerequisites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ModulePrerequisites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "chapters_order_key" ON "chapters"("order");

-- CreateIndex
CREATE UNIQUE INDEX "project_progress_projectId_moduleId_key" ON "project_progress"("projectId", "moduleId");

-- CreateIndex
CREATE INDEX "_ModulePrerequisites_B_index" ON "_ModulePrerequisites"("B");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_progress" ADD CONSTRAINT "project_progress_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_progress" ADD CONSTRAINT "project_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModulePrerequisites" ADD CONSTRAINT "_ModulePrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModulePrerequisites" ADD CONSTRAINT "_ModulePrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
