"use server";

import { ProjectData } from "@/lib/types";
import prisma from "../../prisma/client";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserId } from "./user.actions";

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
  const userId = await getUserId();

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

export async function getProjectId() {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }
  const project = await prisma.project.findFirst({
    where: { userId },
  });

  if (!project) {
    return null;
  }
  return project.id;
}

export async function isProjectBasicFilled() {
  const projectId = await getProjectId();

  if (!projectId) return false;

  const projectBasics = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      title: true,
      shortDescription: true,
      longDescription: true,
    },
  });

  if (
    projectBasics?.title &&
    projectBasics.shortDescription &&
    projectBasics.longDescription
  ) {
    return true;
  } else {
    return false;
  }
}
