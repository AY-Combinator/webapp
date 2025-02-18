"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateProgressPercentage } from "@/lib/helpers";
import { ModuleData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle, SketchLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ModuleCardProps = ModuleData & {
  color: "golden" | "sky" | "orange" | "indigo";
  icon: React.ReactNode;
};

const ModuleCard = ({
  name,
  slug,
  difficulty,
  maxScore,
  score,
  completed,
  color,
  icon,
  clickable,
}: ModuleCardProps) => {
  const clampedPoints = Math.max(0, Math.min(score, maxScore));
  const progressValue = calculateProgressPercentage({
    points: clampedPoints,
    maxPoints: maxScore,
  });
  const pathname = usePathname();
  const linkUrl = clickable ? `/module/${slug}` : "#";
  return (
    <Link
      href={linkUrl}
      className={cn("w-full", {
        "opacity-30": !clickable,
      })}
    >
      <div
        className={cn(
          "cursor-pointer border border-solid border-black/30 shadow-sm shadow-black/15 rounded-sm bg-accent-foreground p-1 flex flex-col gap-1 transition-all duration-200 ease-in-out",
          `hover:bg-${color}/30`,
          pathname.includes(slug) && `bg-${color}/30`
        )}
      >
        <div className="flex items-center gap-4 ~p-2/3">
          <div
            className={`min-w-12 min-h-12 bg-${color}-gradient rounded-lg border-2 border-solid border-black/15 flex items-center justify-center`}
          >
            {icon}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-background text-sm leading-tight font-archivo-black uppercase">
              {name}
            </h3>
            <div className="flex items-center ~gap-x-2/3 text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <SketchLogo size={18} weight="light" />
                <span className="text-sm">{clampedPoints} Points</span>
              </div>
              {completed && (
                <div className="flex items-center gap-1">
                  <CheckCircle size={18} weight="fill" />
                  <span className="text-sm">Done</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Progress value={progressValue} />
        <Badge
          className={`w-max bg-${color}-gradient font-normal text-primary py-0.5 px-1 text-xs leading-none my-1`}
        >
          {difficulty}
        </Badge>
      </div>
    </Link>
  );
};
export default ModuleCard;
