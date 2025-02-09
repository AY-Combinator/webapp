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
    label: "Settings",
    href: "/settings",
    newTab: false,
    ariaLabel: "Go to Settings",
    external: false,
  },
];
