"use client";

import ChatInput from "@/components/molecule/Chat/Input";
import MessagesStream from "@/components/molecule/Chat/MessagesStream";
import { Message } from "@/lib/types";
import { useState, useEffect } from "react";
import { AUTHONOME_URL } from "../../../../constants";
import { updateModuleChatHistory } from "@/actions/module.actions";

interface ConversationProps {
  //  TODO: fix this
  chatHistory: Message[] | [];
  agentId: string;
  moduleId: string;
  userId: string;
}

const Conversation = ({ chatHistory, agentId, moduleId, userId }: ConversationProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);

  const addUserMessage = async (userMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsResponseLoading(true);

    console.log(userMessage);

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
            roomId: userId,
            userId: "user",
            userName: "User",
            text: userMessage.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsResponseLoading(false);


      const assistantMessage: Message = { role: "assistant", content: data[0].text };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      await updateModuleChatHistory(moduleId, [userMessage, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setIsResponseLoading(false);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    setMessages(chatHistory);
  }, []);

  return (
    <section className="flex flex-col justify-between w-full overflow-hidden">
      <MessagesStream agentResponding={isResponseLoading} messages={messages} />
      <ChatInput addUserMessage={addUserMessage} className="w-4/5 mx-auto mb-6 mt-2" />
    </section>
  );
};
export default Conversation;
