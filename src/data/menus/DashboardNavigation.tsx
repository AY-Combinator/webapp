import { NavigationItem } from "@/lib/types";

export const DashboardNavigation: NavigationItem[] = [
  {
    label: "Leaderboard",
    href: "/leaderboard",
    newTab: false,
    ariaLabel: "Go to Leaderboard",
    external: false,
  },
  {
    label: "Profile",
    href: "/profile",
    newTab: false,
    ariaLabel: "Go to Profile",
    external: false,
  },
  {
    label: "Settings",
    href: "/settings",
    newTab: false,
    ariaLabel: "Go to Settings",
    external: false,
  },
];
