import ChatHistory from "@/components/molecule/Sidebar/Chat/ChatHistory";
import ChatTitle from "@/components/atom/Chat/ChatTitle";
import ChatFiles from "./ChatFiles";
import { FoldersMockData } from "@/data/mock/folders";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <ScrollArea className="h-auto w-full">
        <div className="flex flex-col h-full">
          <ChatTitle title="Business Model Canvas" points={21} maxPoints={42} />
          <ChatHistory />
        </div>
      </ScrollArea>
      <ChatFiles files={FoldersMockData} />
    </div>
  );
};
export default ChatSidebar;
