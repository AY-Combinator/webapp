"use server";
import { ChapterData, Message } from "@/lib/types";
import { cookies } from "next/headers";
import prisma from "../../prisma/client";
import { getUserId } from "./user.actions";
import { getProjectId } from "./project.actions";

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
    const totalModules = global.totalModuleCount;
    if (!totalModules) {
      const modulesCount = await prisma.module.count();
      global.totalModuleCount = modulesCount;
    }

    const completedModules = await prisma.projectProgress.count({
      where: {
        project: {
          userId,
        },
        completed: true,
      },
    });

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
            description: true,
            difficulty: true,
            maxScore: true,
            order: true,
            ProjectProgress: {
              where: { project: { userId } },
              select: { score: true, completed: true },
            },
          },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    const modulesByChapters = chaptersWithModules.map((chapter) => ({
      chapterId: chapter.id,
      chapterName: chapter.name,
      modules: chapter.modules.map((module) => ({
        id: module.id,
        name: module.name,
        slug: module.slug,
        description: module.description,
        difficulty: module.difficulty,
        maxScore: module.maxScore,
        order: module.order,
        score:
          module.ProjectProgress.length > 0
            ? module.ProjectProgress[0].score
            : 0,
        completed:
          module.ProjectProgress.length > 0
            ? module.ProjectProgress[0].completed
            : false,
        agentId: "",
      })),
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

  await prisma.projectProgress.update({
    where: { id: moduleId, projectId: projectId },
    data: { chatHistory: [...moduleChatHistory, ...newMessages] },
  });
}
