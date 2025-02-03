import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  title: string;
  image: string;
  orientation?: "horizontal" | "vertical";
}

const ProjectAvatar = ({
  title,
  image,
  orientation = "horizontal",
}: ProjectAvatarProps) => {
  const imageSize = orientation === "horizontal" ? 60 : 92;
  return (
    <div
      className={cn("flex gap-3 items-center", {
        "flex-col": orientation === "vertical",
      })}
    >
      <div
        className={cn(
          "rounded-full border-solid border-white overflow-hidden w-max h-max shadow-md shadow-black/25",
          {
            "border-[6px]": orientation === "vertical",
            "border-[3px]": orientation === "horizontal",
          }
        )}
      >
        <Image src={image} width={imageSize} height={imageSize} alt={title} />
      </div>
      <span className="font-bold text-base">{title}</span>
    </div>
  );
};
export default ProjectAvatar;
