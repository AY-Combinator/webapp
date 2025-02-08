"use client";

import ChatInput from "@/components/molecule/Chat/Input";
import MessagesStream from "@/components/molecule/Chat/MessagesStream";
import { Message } from "@/lib/types";
import { useState } from "react";
import { AUTHONOME_URL } from "../../../../constants";

interface ConversationProps {
  agentId: string;
}

const Conversation = ({ agentId }: ConversationProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);

  const addUserMessage = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setIsResponseLoading(true);

    try {
      const response = await fetch(
        `${AUTHONOME_URL}/${agentId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.NEXT_PUBLIC_AUTHONOME_BASIC_AUTH_TOKEN}`,
          },
          body: JSON.stringify({
            userId: "user",
            userName: "User",
            text: message.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsResponseLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data[0].text, user: "agent" },
      ]);

      console.log(messages);
    } catch (error) {
      console.error("Error:", error);
      setIsResponseLoading(false);
      // Handle error appropriately
    }
  };


  return (
    <section className="flex flex-col justify-between w-full overflow-hidden">
      <MessagesStream agentResponding={isResponseLoading} messages={messages} />
      <ChatInput addUserMessage={addUserMessage} className="w-4/5 mx-auto mb-6 mt-2" />
    </section>
  );
};
export default Conversation;
