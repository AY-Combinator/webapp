import ProjectAvatar from "@/components/atom/ProjectAvatar";
import { LeadershipPlacement } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Minus } from "@phosphor-icons/react/dist/ssr";

const renderInvestmentData = (invested: boolean) => {
  const Icon = invested ? Check : Minus;
  const copy = invested ? "Invested" : "Passed";
  return (
    <div
      className={cn("flex items-center gap-1 text-golden", {
        "text-muted-foreground": !invested,
      })}
    >
      <Icon size={16} />
      <span>{copy}</span>
    </div>
  );
};

const TableItem = ({
  title,
  image,
  placement,
  points,
  invested,
}: LeadershipPlacement) => {
  return (
    <div className="w-full rounded flex items-center justify-between gap-4 py-3 px-6 cursor-pointer hover:bg-background transition-all duration-200 ease-in-out">
      <div className="flex items-center gap-4">
        <span className="text-black/50 text-base">{placement}th</span>
        <ProjectAvatar title={title} image={image} orientation="horizontal" />
      </div>
      <div className="flex items-center gap-6">
        {renderInvestmentData(invested)}
        <p className="text-black">{points} points</p>
      </div>
    </div>
  );
};
export default TableItem;
