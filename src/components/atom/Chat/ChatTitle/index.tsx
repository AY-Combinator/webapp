import { Progress } from "@/components/ui/progress";
import { calculateProgressPercentage } from "@/lib/helpers";

interface ChatTitleProps {
  title: string;
  points: number;
  maxPoints: number;
}

const ChatTitle = ({ title, points, maxPoints }: ChatTitleProps) => {
  const progressValue = calculateProgressPercentage({ points, maxPoints });
  return (
    <div className="w-full flex flex-col ~px-4/6 py-4 ~gap-6/10 bg-sand-sky-gradient">
      <h1 className="font-archivo-black text-2xl">{title}</h1>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center justify-between w-full text-background">
          <span className="font-inter font-medium uppercase text-sm drop-shadow-lg">
            Points
          </span>
          <div className="font-archivo text-base tracking-tighter font-light">
            <span className="font-archivo-black text-2xl leading-none">
              {points} /{" "}
            </span>
            {maxPoints}
          </div>
        </div>
        <Progress
          value={progressValue}
          className="h-3 bg-background border-2 border-solid border-background"
          indicatorClassName="bg-sky-gradient"
        />
      </div>
    </div>
  );
};
export default ChatTitle;
