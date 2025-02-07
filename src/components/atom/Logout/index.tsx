"use client";

import { logoutUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { useLogout } from "@privy-io/react-auth";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useLogout({
    onSuccess: async () => {
      await logoutUser();
      redirect("/");
    },
  });
  return <Button onClick={logout}>Log out</Button>;
};
export default LogoutButton;
