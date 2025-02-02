import ChatSidebar from "@/components/molecule/Sidebar/Chat";

const Chat = () => {
  return (
    <div className="grid grid-cols-4 bg-white h-full w-full border border-solid border-border shadow-lg rounded-lg">
      <div className="col-span-1 border-r border-border border-solid">
        <ChatSidebar />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
export default Chat;
