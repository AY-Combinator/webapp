"use client";
import { Progress } from "@/components/ui/progress";
import { calculateProgressPercentage } from "@/lib/helpers";
import { ModuleMock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle, SketchLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ModuleCard = ({ title, color, icon, slug, points }: ModuleMock) => {
  const clampedPoints = Math.max(0, Math.min(points, 42));
  const progressValue = calculateProgressPercentage({
    points: clampedPoints,
    maxPoints: 42,
  });
  const pathname = usePathname();
  return (
    <Link href={`/module/${slug}`}>
      <div
        className={cn(
          "cursor-pointer border border-solid border-black/30 shadow-sm shadow-black/15 rounded-sm bg-accent-foreground p-1 flex flex-col gap-1 transition-all duration-200 ease-in-out",
          `hover:bg-${color}/30`,
          pathname.includes(slug) && `bg-${color}/30`
        )}
      >
        <div className="flex items-center gap-4 ~p-2/3">
          <div
            className={`min-w-16 min-h-16 bg-${color}-gradient rounded-lg border-2 border-solid border-black/15 flex items-center justify-center`}
          >
            {icon}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-background text-base leading-tight font-archivo-black uppercase">
              {title}
            </h3>
            <div className="flex items-center ~gap-x-2/3 text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <SketchLogo size={18} weight="light" />
                <span className="text-sm">{clampedPoints} Points</span>
              </div>
              {progressValue === 100 && (
                <div className="flex items-center gap-1">
                  <CheckCircle size={18} weight="fill" />
                  <span className="text-sm">Done</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Progress value={progressValue} />
      </div>
    </Link>
  );
};
export default ModuleCard;
