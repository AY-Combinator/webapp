import { ScrollArea } from "@/components/ui/scroll-area";
import { FoldersMockData } from "@/data/mock/folders";
import Folder from "../Folder";
import SectionWrapper from "@/components/atom/SectionWrapper";

const DataRoom = () => {
  return (
    <SectionWrapper className="h-1/2">
      <h2 className="font-archivo-black text-lg leading-none">Data Room</h2>
      <ScrollArea className="w-full">
        <div className="flex flex-wrap gap-5">
          {FoldersMockData.map((folder) => (
            <Folder key={folder.title} {...folder} />
          ))}
        </div>
      </ScrollArea>
    </SectionWrapper>
  );
};
export default DataRoom;
