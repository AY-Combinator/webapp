import ModuleCard from "@/components/atom/Card/Module";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModulesMockData } from "@/data/mock/modules";

const ModuleList = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-4 h-full w-full">
        {ModulesMockData.map((module, index) => (
          <ModuleCard
            key={index}
            color={module.color}
            title={module.title}
            icon={module.icon}
            points={module.points}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
export default ModuleList;
