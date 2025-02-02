import ChatHistory from "@/components/molecule/Sidebar/Chat/ChatHistory";
import ChatTitle from "@/components/atom/Chat/ChatTitle";
import ChatFiles from "./ChatFiles";
import { FoldersMockData } from "@/data/mock/folders";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col">
      <ChatTitle title="Business Model Canvas" points={21} maxPoints={42} />
      <ChatHistory />
      <ChatFiles files={FoldersMockData} />
    </div>
  );
};
export default ChatSidebar;
