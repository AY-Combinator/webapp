"use client";

import { createUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";

const LoginButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { login } = useLogin({
    onComplete: ({ user, isNewUser }) => {
      if (user) {
        if (isNewUser) {
          startTransition(async () => {
            const res = await createUser(user);
            if (res.success) {
              router.push("/dashboard");
            } else {
              toast.error(res.error);
            }
          });
        } else {
          router.push("/dashboard");
        }
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login failed, please try again.");
    },
  });

  return (
    <Button
      className="bg-orange text-background shadow-lg"
      onClick={login}
      disabled={isPending}
    >
      Go to dashboard
    </Button>
  );
};

export default LoginButton;
