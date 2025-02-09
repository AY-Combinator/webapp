"use client";

import { useState } from "react";
import ChatInput from "@/components/molecule/Chat/Input";
import MessagesStream from "@/components/molecule/Chat/MessagesStream";
import { Message } from "@/lib/types";
import Mascot from "@/assets/images/chat-mascot.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const FundingEvaluation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

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
        <Button>Start evaluation</Button>
      </div>


      <section className="flex flex-col flex-1 justify-between w-full overflow-hidden px-10">
        <MessagesStream agentResponding={false} messages={messages} />
        <ChatInput addUserMessage={addUserMessage} className=" mb-6 mt-2" />
      </section>

    </div>
  );
};

export default FundingEvaluation; 