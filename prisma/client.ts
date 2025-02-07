import { PrismaClient } from "@prisma/client";

declare global {
  var totalModulePoints: number | undefined;
  var totalModuleCount: number | undefined;
}
/**
 * Whenever a new user is created and project initialized, automatically create 0 state for progress.
 */
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        try {
          const newUser = await query(args);

          const createdProject = await prisma.project.findFirst({
            where: { userId: newUser.id },
            select: { id: true },
          });

          if (!createdProject) {
            console.warn(
              "⚠ No project created with user. Skipping progress initialization."
            );
            return newUser;
          }

          // Fetch existing modules
          const modules = await prisma.module.findMany({
            select: { id: true },
          });

          if (modules.length === 0) {
            console.warn(
              "⚠ No modules found. Skipping project progress initialization."
            );
            return newUser;
          }

          // Prepare project progress entries
          const progressData = modules.map((module) => ({
            projectId: createdProject.id,
            moduleId: module.id,
            score: 0,
            completed: false,
          }));

          // Insert progress data
          await prisma.projectProgress.createMany({
            data: progressData,
            skipDuplicates: true,
          });

          return newUser;
        } catch (error) {
          console.error("❌ Error initializing project progress:", error);
          throw new Error(
            "Internal Server Error: Project progress initialization failed."
          );
        }
      },
    },
  },
});
export default prisma;
