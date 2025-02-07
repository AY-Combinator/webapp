"use server";

import { User } from "@privy-io/react-auth";
import prisma from "../../prisma/client";
import { cookies } from "next/headers";
import privy from "@/lib/privy";
export const createUser = async (data: User) => {
  try {
    const userId = data.id.replace(/^did:privy:/, "");

    const { id, address, chainType } = await privy.walletApi.create({
      chainType: "ethereum",
    });

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
        Wallet: {
          create: {
            id: id,
            address: address,
            chainType: chainType,
          },
        },
      },
      include: { projects: true, Wallet: true },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user." };
  }
};

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }
  return userId;
}
