import ChatTitle from "@/components/atom/Chat/ChatTitle";
import ChatFile from "./ChatFiles";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ExtendedModuleData } from "@/actions/module.actions";
import { FolderItem } from "@/lib/types";
import { File } from "@phosphor-icons/react/dist/ssr";
import { getProjectId } from "@/actions/project.actions";

interface ChatSidebarProps {
  data: ExtendedModuleData;
}

const ChatSidebar = async ({ data }: ChatSidebarProps) => {
  const projectId = await getProjectId();

  if (!data || !projectId) return;

  const {
    id,
    name,
    slug,
    description,
    difficulty,
    moduleProgress,
    maxScore,
    requiredModules,
  } = data;

  const folderItem: FolderItem = {
    title: name,
    color: "sky",
    icon: <File size={36} />,
    url: moduleProgress ? moduleProgress.deliverable : null,
    moduleId: id,
    slug: slug,
    projectId: projectId,
  };

  return (
    <div className="flex flex-col w-full h-full justify-between overflow-hidden">
      <ScrollArea className="h-auto w-full">
        <div className="flex flex-col h-full">
          <ChatTitle
            title={name}
            points={moduleProgress?.score || 0}
            maxPoints={maxScore}
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <Badge
            className={`w-max bg-sky-gradient font-normal text-primary py-0.5 px-1 text-xs leading-none my-1`}
          >
            {difficulty}
          </Badge>
          <div className="font-archivo">
            <p>{description}</p>
          </div>
          {requiredModules.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="font-archivo-black">Required for:</span>
              <div className="flex flex-col gap-2">
                {requiredModules.map((module, index) => {
                  const { name } = module.module;
                  return (
                    <div
                      key={index}
                      className="px-3 py-1 bg-background rounded-lg text-sm font-archivo w-max"
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <ChatFile folderItem={folderItem} />
    </div>
  );
};
export default ChatSidebar;
