"use server";

import { ChapterData, ProjectData } from "@/lib/types";
import prisma from "../../prisma/client";
import { cookies } from "next/headers";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UserProjectResponse {
  success: boolean;
  status?: number;
  message?: string;
  project?: ProjectData;
}

/**
 * Temporary implementation:
 * Our database assumes that users can have multiple projects, while our UX still doesn't support that.
 * The implementation of this function needs to be changed when the UX supports multiple projects per user.
 */

export async function getUserProject(): Promise<UserProjectResponse> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { success: false, status: 403, message: "Unauthorized" };
  }

  try {
    const project = await prisma.project.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        featuredImage: true,
        shortDescription: true,
        longDescription: true,
        tags: true,
      },
    });

    if (!project) {
      return {
        success: false,
        status: 404,
        message: "No project found for this user",
      };
    }

    const earnedPoints = await prisma.projectProgress.aggregate({
      where: { projectId: project.id },
      _sum: { score: true },
    });

    let totalPoints = global.totalModulePoints;
    if (!totalPoints) {
      const moduleScores = await prisma.module.aggregate({
        _sum: { maxScore: true },
      });
      totalPoints = moduleScores._sum.maxScore || 0;
      global.totalModulePoints = totalPoints;
    }

    return {
      success: true,
      project: {
        ...project,
        cumulativeProgress: {
          earnedPoints: earnedPoints._sum.score || 0,
          totalPoints,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching user project:", error);
    return { success: false, status: 500, message: "Internal server error" };
  }
}

interface UpdateProjectParams {
  projectId: string;
  field: keyof Project;
  value: string;
}

export async function updateProject({
  projectId,
  field,
  value,
}: UpdateProjectParams) {
  try {
    if (!projectId || !field || value === undefined) {
      throw new Error("Invalid request: Missing required fields");
    }

    if (!(field in prisma.project.fields)) {
      throw new Error("Invalid field name");
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { [field]: field === "tags" ? JSON.parse(value) : value },
    });
    revalidatePath("/dashboard");
    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, message: "Failed to update project" };
  }
}

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
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { success: false, status: 403, message: "Unauthorized", data: null };
  }
  try {
    let totalModules = global.totalModuleCount;
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
