import ProjectAvatar from "@/components/atom/ProjectAvatar";
import { LeadershipPlacement } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import First from "@/assets/images/1st-place-box.svg";
import Second from "@/assets/images/2nd-place-box.svg";
import Third from "@/assets/images/3rd-place-box.svg";
import Highlight from "@/assets/images/1st-place-highlight.svg";

type PlacementConfig = {
  bgColor: string;
  image: string;
  padding: string;
  highlight: boolean;
};

const placementConfig: Record<number, PlacementConfig> = {
  1: {
    bgColor: "bg-podium-first",
    image: First,
    padding: "py-11",
    highlight: true,
  },
  2: {
    bgColor: "bg-podium-second",
    image: Second,
    padding: "py-6",
    highlight: false,
  },
  3: {
    bgColor: "bg-podium-third",
    image: Third,
    padding: "py-4",
    highlight: false,
  },
};
const PodiumBox = ({
  title,
  image,
  placement,
  points,
  invested,
}: LeadershipPlacement) => {
  if (placement > 3) return;
  const {
    bgColor,
    image: boxImage,
    padding,
    highlight,
  } = placementConfig[placement];

  const Icon = invested ? Check : Minus;
  return (
    <div className="flex flex-col gap-5 items-center justify-end">
      <ProjectAvatar title={title} image={image} orientation="vertical" />
      <div className="relative w-full">
        {highlight && (
          <Image
            src={Highlight}
            className="absolute bottom-full scale-[1.35] left-0 right-0 w-full z-[1]"
            alt="highlight"
          />
        )}
        <div
          className={`w-full ${bgColor} flex flex-col items-center justify-center ${padding} gap-4 relative z-10`}
        >
          <Image
            src={boxImage}
            className="absolute bottom-full left-0 w-full"
            alt={`${placement} place`}
          />
          <p className="font-archivo-black text-white text-6xl leading-none">
            {placement}
            <span className="font-archivo text-base leading-none">
              {placement === 1 ? "st" : placement === 2 ? "nd" : "rd"}
            </span>
          </p>
          <Badge className="bg-white/50 text-podium-text rounded-full hover:bg-white/50">
            {points} p
          </Badge>
          <Icon
            size={16}
            className="absolute text-podium-text bottom-3 right-3"
          />
        </div>
      </div>
    </div>
  );
};
export default PodiumBox;
