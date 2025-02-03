import ChatInput from "@/components/molecule/Chat/Input";
import MessagesStream from "@/components/molecule/Chat/MessagesStream";

const Conversation = () => {
  return (
    <section className="flex flex-col justify-between w-full overflow-hidden">
      <MessagesStream />
      <ChatInput className="w-4/5 mx-auto mb-6 mt-2" />
    </section>
  );
};
export default Conversation;
