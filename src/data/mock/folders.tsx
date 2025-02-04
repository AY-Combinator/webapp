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
    title: "Vision Statement",
    uploaded: false,
  },
  {
    title: "User Persona",
    uploaded: false,
  },
  {
    title: "Customer Journey",
    uploaded: false,
  },
  {
    title: "Jobs To Be Done",
    uploaded: false,
  },
  {
    title: "SWOT Analysis",
    uploaded: false,
  },
  {
    title: "User Stories",
    uploaded: false,
  },
  {
    title: "Pitch Deck",
    uploaded: false,
  },
];

export { FoldersMockData };
