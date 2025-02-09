"use server";
import { ChapterData, Message } from "@/lib/types";
import { cookies } from "next/headers";
import prisma from "../../prisma/client";
import { getUserId } from "./user.actions";
import { getProjectId } from "./project.actions";
import { revalidatePath } from "next/cache";

export interface ModulesResponseData {
  totalModules?: number;
  completedModules?: number;
  modulesByChapters?: ChapterData[];
}
interface GetModulesResponse {
  success: boolean;
  data: ModulesResponseData | null;
  status?: number;
  message?: string;
}
export async function getModules(): Promise<GetModulesResponse> {
  const userId = await getUserId();
  if (!userId) {
    return { success: false, status: 403, message: "Unauthorized", data: null };
  }

  try {
    const totalModules =
      global.totalModuleCount || (await prisma.module.count());
    global.totalModuleCount = totalModules;

    const completedModules = await prisma.projectProgress.count({
      where: { project: { userId }, completed: true },
    });

    const projectId = await getProjectId();
    if (!projectId) {
      return {
        success: false,
        status: 400,
        message: "No project found",
        data: null,
      };
    }

    const chaptersWithModules = await prisma.chapter.findMany({
      select: {
        id: true,
        name: true,
        order: true,
        modules: {
          select: {
            id: true,
            name: true,
            slug: true,
            agentId: true,
            description: true,
            difficulty: true,
            maxScore: true,
            order: true,
            ProjectProgress: {
              where: { projectId },
              select: { score: true, completed: true, deliverable: true },
            },
            prerequisites: {
              select: {
                module: {
                  select: {
                    id: true,
                    name: true,
                    agentId: true,
                    maxScore: true,
                    ProjectProgress: {
                      where: { projectId },
                      select: { score: true, deliverable: true },
                    },
                  },
                },
              },
            },
          },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    // Determine if the module is clickable
    const modulesByChapters = chaptersWithModules.map((chapter) => ({
      chapterId: chapter.id,
      chapterName: chapter.name,
      modules: chapter.modules.map((module) => {
        const moduleProgress = module.ProjectProgress[0];

        // Check if all prerequisites are met
        const prerequisitesMet = module.prerequisites.every((prereq) => {
          const prereqProgress = prereq.module.ProjectProgress[0];
          return (
            prereqProgress &&
            prereqProgress.deliverable !== null &&
            prereqProgress.score >= 0.6 * prereq.module.maxScore
          );
        });

        return {
          id: module.id,
          name: module.name,
          slug: module.slug,
          agentId: module.agentId ?? "",
          description: module.description,
          difficulty: module.difficulty,
          maxScore: module.maxScore,
          order: module.order,
          score: moduleProgress?.score ?? 0,
          completed: moduleProgress?.completed ?? false,
          deliverable: moduleProgress?.deliverable ?? null,
          clickable: prerequisitesMet,
        };
      }),
    }));

    return {
      success: true,
      data: {
        totalModules,
        completedModules,
        modulesByChapters,
      },
    };
  } catch (error) {
    console.error("Error fetching modules:", error);
    return { success: false, message: "Failed to fetch modules", data: null };
  }
}

export interface ModuleProgress {
  score: number;
  completed: boolean;
  deliverable: string | null;
  chatHistory: Message[] | null;
}

export interface RequiredModule {
  name: string;
}

export interface ModuleData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  difficulty: string;
  maxScore: number;
  order: number;
  chapterId: string;
  agentId: string | null;
  requiredModules: { module: RequiredModule }[];
}

export type ExtendedModuleData =
  | (ModuleData & { moduleProgress: ModuleProgress | null })
  | null;

export interface GetModuleBySlugResponse {
  success: boolean;
  module: ExtendedModuleData;
  message?: string;
}

export async function getModuleBySlug(
  slug: string
): Promise<GetModuleBySlugResponse> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { success: false, module: null, message: "Unauthorized" };
  }

  try {
    const moduleItem = await prisma.module.findFirst({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        difficulty: true,
        maxScore: true,
        order: true,
        chapterId: true,
        agentId: true,
        requiredModules: {
          select: {
            module: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!moduleItem) {
      console.error(`Module at ${slug} not found`);
      return {
        success: false,
        module: null,
        message: `Module at ${slug} not found`,
      };
    }

    let moduleProgress = null;

    const projectId = await getProjectId();

    if (projectId) {
      moduleProgress = await prisma.projectProgress.findFirst({
        where: {
          moduleId: moduleItem.id,
          projectId: projectId,
        },
        select: {
          score: true,
          completed: true,
          deliverable: true,
          chatHistory: true,
        },
      });
    }

    return {
      success: true,
      module: {
        ...moduleItem,
        moduleProgress: {
          score: moduleProgress?.score ?? 0,
          completed: moduleProgress?.completed ?? false,
          deliverable: moduleProgress?.deliverable ?? null,
          chatHistory: moduleProgress?.chatHistory as Message[],
        },
      },
    };
  } catch (error) {
    console.error("Error fetching module:", error);
    return {
      success: false,
      module: null,
      message: `Error fetching module: ${error}`,
    };
  }
}

export async function getProjectModulesWithDeliverables() {
  const projectId = await getProjectId();

  if (!projectId) {
    return { success: false, deliverables: null };
  }

  try {
    const modules = await prisma.projectProgress.findMany({
      where: { projectId },
      select: {
        module: {
          select: {
            id: true,
            name: true,
            slug: true,
            chapter: {
              select: {
                order: true,
              },
            },
          },
        },
        deliverable: true,
      },
    });

    const deliverables = modules.map((m) => ({
      name: m.module.name,
      moduleId: m.module.id,
      slug: m.module.slug,
      deliverable: m.deliverable || null,
      chapter: m.module.chapter.order,
    }));

    return { success: true, deliverables };
  } catch (error) {
    console.error(error);
    return { success: false, deliverables: null };
  }
}

export async function getModuleChatHistory(moduleId: string) {
  const projectId = await getProjectId();

  if (!projectId) return null;

  const projectProgress = await prisma.projectProgress.findFirst({
    where: { moduleId: moduleId, projectId: projectId },
    select: {
      chatHistory: true,
    },
  });

  return projectProgress?.chatHistory;
}

export async function updateModuleChatHistory(
  moduleId: string,
  newMessages: Message[]
) {
  const moduleChatHistory =
    ((await getModuleChatHistory(moduleId)) as Message[]) || [];

  const projectId = await getProjectId();

  if (!projectId) return;

  const projectProgress = await prisma.projectProgress.findFirst({
    where: { moduleId: moduleId, projectId: projectId },
  });

  if (!projectProgress) return;

  await prisma.projectProgress.update({
    where: { id: projectProgress.id },
    data: { chatHistory: [...moduleChatHistory, ...newMessages] },
  });
}

export async function updateModuleProgress({
  moduleId,
  score,
  deliverable,
}: {
  moduleId: string;
  score: number;
  deliverable: string;
}) {
  try {
    const selectedModule = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { maxScore: true },
    });
    const projectId = await getProjectId();
    if (!selectedModule || !projectId) throw new Error("Module not found");

    const progress = await prisma.projectProgress.update({
      where: { projectId_moduleId: { projectId, moduleId } },
      data: {
        score: score ?? undefined,
        deliverable: deliverable ?? undefined,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, progress };
  } catch (error) {
    console.error("Error updating module progress:", error);
    return { success: false, message: "Failed to update module progress" };
  }
}
