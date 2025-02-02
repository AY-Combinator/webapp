import Folder from "@/components/molecule/Folder";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FolderItemMock } from "@/lib/types";

interface ChatFilesProps {
  files: FolderItemMock[];
}

const ChatFiles = ({ files }: ChatFilesProps) => {
  return (
    <div className="flex flex-col py-4 px-3 gap-4">
      <h2 className="font-medium pl-3">Files ({files.length})</h2>
      {files.length > 0 && (
        <ScrollArea className="w-full">
          <div className="flex w-max space-x-4 pb-2 px-3">
            {files.map((file) => (
              <Folder key={file.title} {...file} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};
export default ChatFiles;
