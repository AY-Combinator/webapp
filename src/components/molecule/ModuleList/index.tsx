import ModuleCard from "@/components/atom/Card/Module";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChapterData } from "@/lib/types";
import {
  FlagCheckered,
  LineSegments,
  Table,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";
import Chapter from "../Chapter";

export const moduleStyles: {
  color: "golden" | "sky" | "orange" | "indigo";
  icon: ReactNode;
}[] = [
  { color: "golden", icon: <Users size={36} /> },
  { color: "sky", icon: <LineSegments size={36} /> },
  { color: "orange", icon: <Table size={36} /> },
  { color: "indigo", icon: <FlagCheckered size={36} /> },
];

const ModuleList = ({ chapterData }: { chapterData: ChapterData[] }) => {
  return (
    <ScrollArea className="h-full w-full px-2">
      <div className="flex flex-col gap-4 h-full w-full max-w-full">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {chapterData.length > 0 &&
            chapterData.map((chapter, index) => (
              <AccordionItem
                key={chapter.chapterId}
                value={chapter.chapterId}
                className={`bg-${moduleStyles[index].color}/30 border border-solid px-3 border-transparent rounded-lg hover:border-border/70 transition`}
              >
                <AccordionTrigger className="hover:no-underline">
                  <Chapter
                    name={chapter.chapterName}
                    order={index + 1}
                  />
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3 max-w-full">
                  {chapter.modules.length > 0 &&
                    chapter.modules.map((module) => (
                      <ModuleCard
                        key={module.id}
                        {...module}
                        icon={moduleStyles[index].icon}
                        color={moduleStyles[index].color}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};
export default ModuleList;
