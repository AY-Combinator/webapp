import fs from "fs";
import prisma from "../client";

async function main() {
  console.log("Seeding database...");

  const chapters = JSON.parse(
    fs.readFileSync("./prisma/seeders/data/chapters.json", "utf-8")
  );
  const modules = JSON.parse(
    fs.readFileSync("./prisma/seeders/data/modules.json", "utf-8")
  );
  const prerequisites = JSON.parse(
    fs.readFileSync("./prisma/seeders/data/prerequisites.json", "utf-8")
  );

  const chapterMap = new Map();
  for (const chapter of chapters) {
    const createdChapter = await prisma.chapter.create({ data: chapter });
    chapterMap.set(chapter.name, createdChapter.id);
  }
  console.log("Chapters seeded.");

  const moduleMap = new Map();
  for (const module of modules) {
    const createdModule = await prisma.module.create({
      data: {
        name: module.name,
        slug: module.slug,
        agentId: module.agentId,
        description: module.description,
        difficulty: module.difficulty,
        maxScore: module.maxScore,
        order: module.order,
        chapter: { connect: { id: chapterMap.get(module.chapterName) } },
      },
    });
    moduleMap.set(module.name, createdModule.id);
  }
  console.log("Modules seeded.");

  for (const prereq of prerequisites) {
    if (
      moduleMap.has(prereq.moduleName) &&
      moduleMap.has(prereq.prerequisiteName)
    ) {
      await prisma.modulePrerequisite.create({
        data: {
          module: { connect: { id: moduleMap.get(prereq.moduleName) } },
          prerequisiteModule: {
            connect: { id: moduleMap.get(prereq.prerequisiteName) },
          },
        },
      });
    }
  }
  console.log("Prerequisites seeded.");

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
