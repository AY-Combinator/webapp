import { ScrollArea } from "@/components/ui/scroll-area";
import Folder from "../Folder";
import SectionWrapper from "@/components/atom/SectionWrapper";
import { getProjectModulesWithDeliverables } from "@/actions/module.actions";
import { moduleStyles } from "../ModuleList";
import { getProjectId } from "@/actions/project.actions";

const DataRoom = async () => {
  const { deliverables } = await getProjectModulesWithDeliverables();
  const projectId = await getProjectId();
  return (
    <SectionWrapper className="h-1/2">
      <h2 className="font-archivo-black text-lg leading-none">Data Room</h2>
      <ScrollArea className="w-full">
        <div className="flex flex-wrap gap-4">
          {projectId &&
            deliverables &&
            deliverables.length > 0 &&
            deliverables.map((deliverable) => (
              <Folder
                key={deliverable.name}
                projectId={projectId}
                icon={moduleStyles[deliverable.chapter - 1].icon}
                color={moduleStyles[deliverable.chapter - 1].color}
                title={deliverable.name}
                url={deliverable.deliverable}
                moduleId={deliverable.moduleId}
                slug={deliverable.slug}
              />
            ))}
        </div>
      </ScrollArea>
    </SectionWrapper>
  );
};
export default DataRoom;
