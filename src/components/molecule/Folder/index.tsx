"use client";
import Image from "next/image";
import ActiveFolder from "@/assets/images/folder-active.svg";
import InactiveFolder from "@/assets/images/folder-inactive.svg";
import { cn } from "@/lib/utils";
import { CircleNotch, UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { FolderItem } from "@/lib/types";
import { useRef, useState } from "react";
import { uploadModuleFIleToS3 } from "@/actions/upload.actions";
import { toast } from "sonner";

const Folder = ({
  color,
  icon,
  title,
  url,
  slug,
  moduleId,
  projectId,
}: FolderItem) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileUrl, setFileUrl] = useState(url);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    const { url: newFileUrl } = await uploadModuleFIleToS3(
      file,
      projectId,
      slug,
      moduleId,
      fileUrl
    );
    if (newFileUrl) {
      setFileUrl(newFileUrl);
    } else {
      toast.error("Upload failed, please try again.");
    }
    setIsLoading(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleClick = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  return (
    <div
      className={cn("relative w-max cursor-pointer group")}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Image
        src={fileUrl ? ActiveFolder : InactiveFolder}
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
                "text-black/25 group-hover:text-black/70": !fileUrl,
                "text-black-70": isDragging,
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
                  !fileUrl,
                "border-background-secondary/70 text-background-secondary/70":
                  isDragging,
              }
            )}
          >
            {isLoading ? (
              <CircleNotch className="h-6 w-6 animate-spin" />
            ) : fileUrl ? (
              icon
            ) : (
              <UploadSimple size={32} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
