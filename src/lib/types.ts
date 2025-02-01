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
  color: "golden" | "sky" | "orange" | "indigo";
  icon: React.ReactNode;
  points: number;
}

export type { NavigationItem, ModuleMock };