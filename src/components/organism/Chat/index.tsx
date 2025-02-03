import ChatSidebar from "@/components/molecule/Sidebar/Chat";

const Chat = () => {
  return (
    <div className="grid grid-cols-4 bg-white w-full border border-solid border-border shadow-lg rounded-lg h-full overflow-hidden">
      <div className="col-span-1 border-r border-border border-solid h-full w-full flex overflow-y-auto">
        <ChatSidebar />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
export default Chat;
