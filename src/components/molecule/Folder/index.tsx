import Image from "next/image";
import ActiveFolder from "@/assets/images/folder-active.svg";
import InactiveFolder from "@/assets/images/folder-inactive.svg";
import { cn } from "@/lib/utils";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { FolderItemMock } from "@/lib/types";

const Folder = ({
  uploaded = false,
  color,
  icon,
  title,
  url,
}: FolderItemMock) => {
  return (
    <div className="relative w-max cursor-pointer group">
      <Image
        src={uploaded ? ActiveFolder : InactiveFolder}
        alt="Folder background"
        width={178}
        height={164}
      />
      <div className="absolute inset-0">
        <div className="flex flex-col h-full pl-4 pr-6 pb-6 pt-6 max-w-full gap-5 justify-between">
          <span
            className={cn(
              "font-bold text-sm transition-all duration-200 ease-in-out",
              {
                "text-black/25 group-hover:text-black/70": !uploaded,
              }
            )}
          >
            {title}
          </span>
          <div
            className={cn(
              `bg-${color}/30 text-${color}/80 rounded-sm w-full flex items-center justify-center p-3 border-2 border-solid border-transparent transition-all duration-200 ease-in-out`,
              `group-hover:border-${color} group-hover:text-${color}`,
              {
                "bg-background text-background-secondary/30 group-hover:border-background-secondary/70 group-hover:text-background-secondary/70":
                  !uploaded,
              }
            )}
          >
            {uploaded ? icon : <UploadSimple size={32} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Folder;
