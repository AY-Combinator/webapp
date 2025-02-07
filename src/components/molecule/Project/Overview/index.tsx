"use client";
import SectionWrapper from "@/components/atom/SectionWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tags from "../../Tags";
import { ProjectData } from "@/lib/types";
import { useState } from "react";
import ImageDropzone from "../../ImageDropzone";
import EditDialog from "../../EditDialog";
import { Project } from "@prisma/client";

const Overview = ({
  id,
  title,
  featuredImage,
  longDescription,
  shortDescription,
  tags,
  cumulativeProgress,
}: ProjectData) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<keyof Project | null>(null);
  const [fieldValue, setFieldValue] = useState<string>("");

  const openEditor = (field: keyof Project, value: string) => {
    setEditingField(field);
    setFieldValue(value);
    setIsEditing(true);
  };

  return (
    <SectionWrapper className="flex-row gap-10 h-1/2">
      <div className="w-2/5">
        <div className="w-full h-max max-h-1/2 bg-background rounded-lg p-1 overflow-hidden">
          <div className="flex items-center justify-center h-full flex-1">
            <div className="w-2/5 h-auto cursor-pointer">
              <ImageDropzone currentImage={featuredImage} projectId={id} />
            </div>
            <div className="flex flex-col justify-center items-center w-3/5 h-full p-3 gap-4">
              <span
                className="font-archivo-black text-xl text-center leading-none cursor-pointer"
                onClick={() =>
                  openEditor("title", title ?? "Enter project name")
                }
              >
                {title ? title : `Give your project a great name`}
              </span>
              <span className="font-archivo font-medium text-orange">
                {cumulativeProgress.earnedPoints} /{" "}
                {cumulativeProgress.totalPoints}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden w-3/5 py-3 justify-between">
        <ScrollArea className="w-full">
          <div className="flex flex-col gap-4 text-sm pr-2">
            <h2
              className="font-archivo-black text-lg leading-none cursor-pointer"
              onClick={() =>
                openEditor("shortDescription", shortDescription ?? "")
              }
            >
              {shortDescription ??
                "Click to add a one liner description about your project"}
            </h2>
            <p
              className="cursor-pointer"
              onClick={() =>
                openEditor("longDescription", longDescription ?? "")
              }
            >
              {longDescription ??
                "Click to add a longer description that will tell people how awesome your project is."}
            </p>
          </div>
        </ScrollArea>
        <Tags tags={tags} projectId={id} />
      </div>
      <EditDialog
        isOpen={isEditing}
        projectId={id}
        onClose={setIsEditing}
        field={editingField}
        value={fieldValue}
        onChange={setFieldValue}
      />
    </SectionWrapper>
  );
};
export default Overview;
