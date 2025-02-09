"use client";

import { useState } from "react";
import ChatInput from "@/components/molecule/Chat/Input";
import MessagesStream from "@/components/molecule/Chat/MessagesStream";
import { Message } from "@/lib/types";
import Mascot from "@/assets/images/chat-mascot.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AUTHONOME_URL, INVESTOR_AGENT_ID } from "../../../../constants";

interface FundingEvaluationProps {
  userId: string;
}

const FundingEvaluation = ({ userId }: FundingEvaluationProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const startEvaluation = async () => {
    setIsResponseLoading(true);
    const response = await fetch(`${AUTHONOME_URL}/${INVESTOR_AGENT_ID}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_AUTHONOME_BASIC_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        roomId: userId,
        userId: "user",
        userName: "User",
        text: "Based on all the answers I gave about my startup, can you please evalute and see if you would like to invest? If no, please me give a detailed reason why not.",
      }),
    });

    if (!response.ok) {
      setIsResponseLoading(false);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setIsResponseLoading(false);

    const assistantMessage: Message = { role: "assistant", content: data[0].text };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  };

  const addUserMessage = (message: Message) => {
    setMessages([...messages, message]);
  };


  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      <div className="px-5 lg:px-12 py-7 lg:py-10 border-b border-border flex gap-7 items-center justify-between">
        <div className="text-center w-[150px]">
          <Image
            src={Mascot}
            width={64}
            height={64}
            alt="Chat Mascot"
            className="rounded-full mx-auto mb-2"
          />
          <p className="font-bold leading-none">Investor Agent</p>
        </div>

        <div>
          <p className="text-xl font-bold mb-4">Congratulations!</p>
          <p className=" text-sm mb-2">You have successfully finished all the modules. You can now apply for funding.</p>
          <p className=" text-sm">Would you like to start evaluating your eligibility?</p>
        </div>
        <Button onClick={startEvaluation}>Start evaluation</Button>
      </div>


      <section className="flex flex-col flex-1 justify-between w-full overflow-hidden px-10">
        <MessagesStream agentResponding={isResponseLoading} messages={messages} />
        <ChatInput addUserMessage={addUserMessage} className=" mb-6 mt-2" />
      </section>

    </div>
  );
};

export default FundingEvaluation; 