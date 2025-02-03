"use client";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginButton = () => {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: ({ user }) => {
      if (user) {
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login failed, please try again.");
    },
  });

  return (
    <Button className="bg-orange text-background shadow-lg" onClick={login}>
      Go to dashboard
    </Button>
  );
};
export default LoginButton;
