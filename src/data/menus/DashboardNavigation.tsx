import { NavigationItem } from "@/lib/types";

export const DashboardNavigation: NavigationItem[] = [
  {
    label: "All Projects",
    href: "/dashboard/projects",
    newTab: false,
    ariaLabel: "Go to All Projects",
    external: false,
  },
  {
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
    newTab: false,
    ariaLabel: "Go to Leaderboard",
    external: false,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    newTab: false,
    ariaLabel: "Go to Profile",
    external: false,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    newTab: false,
    ariaLabel: "Go to Settings",
    external: false,
  },
];
