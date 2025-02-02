import { FolderItemMock } from "@/lib/types";
import { FlagCheckered, Table } from "@phosphor-icons/react/dist/ssr";

const FoldersMockData: FolderItemMock[] = [
  {
    title: "Business Model Canvas",
    uploaded: true,
    color: "sky",
    url: "https://google.com",
    icon: <Table size={32} />,
  },
  {
    title: "Mission Statement",
    uploaded: true,
    color: "orange",
    url: "https://google.com",
    icon: <FlagCheckered size={32} />,
  },
  {
    title: "Framework name",
    uploaded: false,
  },
];

export { FoldersMockData };
