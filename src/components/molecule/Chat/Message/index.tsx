import ChatMascot from "@/components/atom/Chat/ChatMascot";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  from: "agent" | "client";
  content: string;
}

const ChatMessage = ({ from, content }: ChatMessageProps) => {
  return (
    <div
      className={cn("flex gap-4 items-center w-full", {
        "justify-end": from === "client",
      })}
    >
      {from === "agent" && <ChatMascot />}
      <div
        className={cn("py-3 px-5 rounded-xl border border-solid text-sm", {
          "border-primary bg-primary text-white w-3/5": from === "agent",
          "border-border bg-background text-black w-2/3": from === "client",
        })}
      >
        {content}
      </div>
    </div>
  );
};
export default ChatMessage;
