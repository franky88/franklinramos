import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteExperienceProps {
  experienceId: string;
  updateExperienceList: () => void;
}

const DeleteExperience = ({
  experienceId,
  updateExperienceList,
}: DeleteExperienceProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const deleteExperience = async () => {
    try {
      const response = await fetch(`/api/experience/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: experienceId }), // Pass the portfolio ID
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to delete portfolio");
        return;
      }

      updateExperienceList();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"link"}
        size={"sm"}
        className="h-7 text-red-500"
      >
        <Trash2 />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this experience?
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete the item.
            </DialogDescription>
          </DialogHeader>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={deleteExperience}
              size={"sm"}
              variant={"destructive"}
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              size={"sm"}
              variant={"outline"}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteExperience;
