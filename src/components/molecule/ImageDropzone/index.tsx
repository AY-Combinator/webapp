import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadFileToS3 } from "@/actions/upload.actions";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
interface DropzoneProps {
  currentImage: string | null;
  projectId: string;
}

const ImageDropzone = ({ currentImage, projectId }: DropzoneProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage ?? null
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setIsUploading(true);
      setError(null);

      const file = acceptedFiles[0];
      const { url } = await uploadFileToS3(file, projectId, currentImage);
      if (url) {
        setImagePreview(url);
      } else {
        setError("Upload failed, please try again.");
        toast.error(error);
      }
      setIsUploading(false);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full h-max  bg-white/80 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white transition p-2",
        {
          "h-full border-dashed border-background-secondary/30 border-2 hover:border-orange":
            !imagePreview,
        }
      )}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <div className="flex gap-2 items-center justify-center">
          <CircleNotch className="h-6 w-6 animate-spin" />
          <p className="text-sm">Uploading...</p>
        </div>
      ) : imagePreview ? (
        <div className="relative w-full h-full flex items-center justify-center ">
          <Image
            src={imagePreview}
            alt="Project Image"
            className="object-cover w-full h-full rounded-md"
            width={200}
            height={200}
          />
        </div>
      ) : (
        <span className="font-archivo text-center text-muted-foreground text-sm p-2">
          Choose a great image for your project
        </span>
      )}
    </div>
  );
};

export default ImageDropzone;
