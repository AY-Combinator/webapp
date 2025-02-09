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

type FolderItem = {
  title: string;
  color?: "golden" | "sky" | "orange" | "indigo";
  icon?: React.ReactNode;
  url: string | null;
  slug: string;
  moduleId: string;
  projectId: string;
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
  eligibleForFunding: boolean | null;
};

type ModuleData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  difficulty: string;
  agentId: string;
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

type Message = {
  role: "user" | "assistant";
  content: string;
};

export type {
  NavigationItem,
  ModuleMock,
  FolderItem,
  LeadershipPlacement,
  ProjectData,
  ModuleData,
  ChapterData,
  Message,
};
