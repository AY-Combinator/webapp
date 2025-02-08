import { Button } from "@/components/ui/button";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowBendRightUp, Paperclip } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

interface ChatInputProps {
  className?: string;
  addUserMessage: (message: Message) => void;
}

const ChatInput = ({ className, addUserMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleAddMessage = () => {
    if (message.trim() === "") return;
    addUserMessage({ role: "user", content: message });
    setMessage(""); // Clear input after sending
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMessage();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-end px-4 py-2 rounded-xl border border-solid border-border bg-background",
        className
      )}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Type your correction here..."
        className="text-sm w-full bg-transparent focus:outline-none border-b border-solid border-border p-2 placeholder:italic caret-orange-500"
      />
      <div className="flex items-center gap-4">
        <Button
          variant={"link"}
          className="cursor-pointer p-0 size-5 text-black hover:text-black/60"
          asChild
        >
          <Paperclip />
        </Button>
        <Button
          onClick={handleAddMessage}
          className="bg-accent-foreground/20 rounded-full size-7 p-1.5 text-accent-foreground/40 hover:text-white"
        >
          <ArrowBendRightUp />
        </Button>
      </div>
    </div>
  );
};
export default ChatInput;
