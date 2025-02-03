import Image from "next/image";
import Mascot from "@/assets/images/chat-mascot.svg";

const ChatMascot = () => {
  return (
    <Image
      src={Mascot}
      width={64}
      height={64}
      alt="Chat Mascot"
      className="rounded-full"
    />
  );
};
export default ChatMascot;
