"use server";

import { ProjectData } from "@/lib/types";
import prisma from "../../prisma/client";
import { cookies } from "next/headers";

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
