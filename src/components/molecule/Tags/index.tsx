"use client";
import { updateProject } from "@/actions/project.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Tags = ({ tags, projectId }: { tags: string[]; projectId: string }) => {
  const [tagInput, setTagInput] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSaveTags = async () => {
    if (!tagInput.trim()) return;

    setIsSaving(true);

    const newTags = Array.from(
      new Set([...tags, ...tagInput.split(",").map((tag) => tag.trim())])
    );

    const response = await updateProject({
      projectId,
      field: "tags",
      value: JSON.stringify(newTags),
    });

    if (response.success) {
      toast.success("Tags updated successfully!");
      setTagInput("");
      setDialogOpen(false);
    } else {
      toast.error("Failed to update tags");
    }

    setIsSaving(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="font-archivo-black mr-1">Tags:</span>
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <Badge
            className="rounded-full bg-background px-2 py-1 leading-none font-source-serif font-semibold italic text-sm text-background-secondary/80 hover:bg-background"
            key={index}
          >
            {tag}
          </Badge>
        ))}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Badge className="rounded-full bg-background px-2 py-1 leading-none font-source-serif font-semibold text-sm text-background-secondary/80 hover:bg-background-secondary cursor-pointer hover:text-white">
            +
          </Badge>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-archivo-black text-lg">
              Add Tags
            </DialogTitle>
            <DialogDescription className="font-archivo text-base text-black">
              Add tags to your project. Separate multiple tags with a comma.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 items-center mt-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tags"
              className="bg-orange/5 placeholder:text-black/60"
            />
            <Button
              className="bg-orange"
              onClick={handleSaveTags}
              isLoading={isSaving}
              disabled={isSaving}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Tags;
