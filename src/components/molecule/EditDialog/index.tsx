"use client";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProject } from "@/actions/project.actions";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import { useState } from "react";

interface EditDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  field: keyof Project | null;
  value: string;
  onChange: (value: string) => void;
  projectId: string;
}

const fieldLabels: Record<string, string> = {
  title: "Project Title",
  shortDescription: "Short Description",
  longDescription: "Detailed Project Description",
};

const EditDialog = ({
  isOpen,
  onClose,
  field,
  value,
  onChange,
  projectId,
}: EditDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveChanges = async () => {
    if (!field) return;

    setIsLoading(true);

    const response = await updateProject({
      projectId: projectId,
      field: field,
      value: value,
    });

    if (response.success) {
      toast.success(`Project updated successfully!`);
    } else {
      toast.error("Failed to update project");
    }
    setIsLoading(false);
    onClose(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit {field ? fieldLabels[field] || "Field" : "Field"}
          </DialogTitle>
        </DialogHeader>
        {field === "longDescription" ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add a longer description of your project here. Feel free to have more than 3 paragraphs."
            rows={6}
          />
        ) : field === "shortDescription" ? (
          <Input
            type={"text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add one sentence that explains your project"
          />
        ) : (
          <Input
            type={"text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add an awesome title for your project"
          />
        )}
        <Button
          onClick={saveChanges}
          disabled={isLoading}
          isLoading={isLoading}
          className="bg-orange"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
