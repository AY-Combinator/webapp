type NavigationItem = {
  label: string;
  href: string;
  newTab?: boolean;
  ariaLabel?: string;
  external?: boolean;
  tabIndex?: number;
};

type ModuleMock = {
  title: string;
  slug: string;
  color: "golden" | "sky" | "orange" | "indigo";
  icon: React.ReactNode;
  points: number;
};

type FolderItemMock = {
  title: string;
  uploaded: boolean;
  color?: "golden" | "sky" | "orange" | "indigo";
  icon?: React.ReactNode;
  url?: string;
};

type LeadershipPlacement = {
  title: string;
  image: string;
  placement: number;
  points: number;
  invested: boolean;
};

export type { NavigationItem, ModuleMock, FolderItemMock, LeadershipPlacement };
