import ChatSidebar from "@/components/molecule/Sidebar/Chat";
import Conversation from "../Conversation";
import { ExtendedModuleData } from "@/actions/module.actions";

interface ChatProps {
  data: ExtendedModuleData;
}

const Chat = ({ data }: ChatProps) => {
  return (
    <div className="grid grid-cols-4 bg-white w-full border border-solid border-border shadow-lg rounded-lg h-full overflow-hidden">
      <div className="col-span-1 border-r border-border border-solid w-full overflow-hidden flex">
        <ChatSidebar data={data} />
      </div>
      <div className="col-span-3 flex justify-center overflow-hidden">
        <Conversation />
      </div>
    </div>
  );
};
export default Chat;
