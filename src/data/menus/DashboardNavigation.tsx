import { NavigationItem } from "@/lib/types";

export const DashboardNavigation: NavigationItem[] = [
  {
    label: "All Projects",
    href: "/all-projects",
    newTab: false,
    ariaLabel: "Go to All Projects",
    external: false,
  },
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
