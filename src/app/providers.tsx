"use client";

import { Toaster } from "@/components/ui/sonner";
import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: "#eeeae8",
          accentColor: "#DF5217",
        },
      }}
    >
      {children}
      <Toaster />
    </PrivyProvider>
  );
}
