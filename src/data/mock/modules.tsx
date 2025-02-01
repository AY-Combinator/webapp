import { ModuleMock } from "@/lib/types";
import {
  FlagCheckered,
  LineSegments,
  Table,
  Users,
} from "@phosphor-icons/react/dist/ssr";

const ModulesMockData: ModuleMock[] = [
  {
    title: "Aliqua enim dolor et esse",
    color: "golden",
    icon: <Users size={36} />,
    points: 42,
  },
  {
    title: "Excepteur elit consectetur ",
    color: "sky",
    icon: <LineSegments size={36} />,
    points: 28,
  },
  {
    title: "Sunt aliquip esse nostrud ",
    color: "orange",
    icon: <Table size={36} />,
    points: 11,
  },
  {
    title: "Duis aute minim enim",
    color: "indigo",
    icon: <FlagCheckered size={36} />,
    points: 2,
  },
];

export { ModulesMockData };
