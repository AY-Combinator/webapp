"use server";
import { sanitizeFileName } from "@/lib/helpers";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import prisma from "../../prisma/client";

const s3Client = new S3Client({
  region: process.env.AY_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AY_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AY_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AY_AWS_S3_BUCKET_NAME!;

export async function uploadProjectImageToS3(
  file: File,
  projectId: string,
  oldImageKey: string | null
) {
  if (!file || !projectId) {
    throw new Error("Invalid file or project ID");
  }
  const fileName = file.name.split(".").slice(0, -1).join(".");
  const sanitizedFileName = sanitizeFileName(fileName);
  const fileExt = file.name.split(".").pop();
  const filePath = `${projectId}/${sanitizedFileName}.${fileExt}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: BUCKET_NAME,
    Body: buffer,
    ContentType: file.type,
    Key: filePath,
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  try {
    const response = await upload.done();
    const publicUrl = response.Location;

    await prisma.project.update({
      where: { id: projectId },
      data: { featuredImage: publicUrl },
    });

    if (oldImageKey) {
      try {
        const url = new URL(oldImageKey);
        const oldFileKey = url.pathname.substring(1);

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: oldFileKey,
          })
        );
      } catch (err) {
        console.error("Failed to extract old image key:", err);
      }
    }

    return { success: true, url: publicUrl };
  } catch (error) {
    return { success: false, message: `Upload failed: ${error}` };
  }
}

export async function uploadModuleFIleToS3(
  file: File,
  projectId: string,
  moduleSlug: string,
  moduleId: string,
  oldFileKey: string | null
) {
  if (!file || !projectId) {
    throw new Error("Invalid file or project ID");
  }
  const fileName = file.name.split(".").slice(0, -1).join(".");
  const sanitizedFileName = sanitizeFileName(fileName);
  const fileExt = file.name.split(".").pop();
  const filePath = `${projectId}/${moduleSlug}/${sanitizedFileName}.${fileExt}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const params = {
    Bucket: BUCKET_NAME,
    Body: buffer,
    ContentType: file.type,
    Key: filePath,
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  try {
    const response = await upload.done();
    const publicUrl = response.Location;

    const existingProgress = await prisma.projectProgress.findFirst({
      where: { projectId: projectId, moduleId: moduleId },
    });

    if (!existingProgress) {
      return { success: false, message: `Upload failed: Progress not found` };
    }

    await prisma.projectProgress.update({
      where: { id: existingProgress.id },
      data: { deliverable: publicUrl },
    });

    if (oldFileKey) {
      try {
        const url = new URL(oldFileKey);
        const fileToReplace = url.pathname.substring(1);

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileToReplace,
          })
        );
      } catch (err) {
        console.error("Failed to extract old file key:", err);
      }
    }

    return { success: true, url: publicUrl };
  } catch (error) {
    return { success: false, message: `Upload failed: ${error}` };
  }
}
