import Folder from "@/components/molecule/Folder";
import { FolderItem } from "@/lib/types";

interface ChatFilesProps {
  folderItem: FolderItem;
}

const ChatFile = ({ folderItem }: ChatFilesProps) => {
  return (
    <div className="flex flex-col py-4 px-3 gap-4 w-full border-t border-solid border-border ">
      <h2 className="font-medium pl-3">Deliverable</h2>
      <div className="flex w-full justify-center">
        <Folder {...folderItem} />
      </div>
    </div>
  );
};
export default ChatFile;
