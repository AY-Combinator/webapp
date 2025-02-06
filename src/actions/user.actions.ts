"use server";

import { User } from "@privy-io/react-auth";
import prisma from "../../prisma/client";
export const createUser = async (data: User) => {
  try {
    const userId = data.id.replace(/^did:privy:/, "");

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: data.email?.address || "",
        walletAddress: data.wallet?.address || "",
        projects: {
          create: {
            title: "",
          },
        },
      },
      include: { projects: true },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user." };
  }
};
