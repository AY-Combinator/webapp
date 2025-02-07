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

type ProjectData = {
  id: string;
  title: string | null;
  featuredImage: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  tags: string[];
  cumulativeProgress: {
    earnedPoints: number;
    totalPoints: number;
  };
};

type ModuleData = {
  id: string;
  name: string;
  description: string | null;
  difficulty: string;
  maxScore: number;
  order: number;
  score: number;
  completed: boolean;
};

type ChapterData = {
  chapterId: string;
  chapterName: string;
  modules: ModuleData[];
};

export type {
  NavigationItem,
  ModuleMock,
  FolderItemMock,
  LeadershipPlacement,
  ProjectData,
  ModuleData,
  ChapterData,
};
