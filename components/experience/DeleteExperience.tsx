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
import axiosInstance from "@/lib/axiosInstance";

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
  const [loading, setLoading] = useState<boolean>(false);

  const deleteExperience = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete("/experience/remove", {
        data: { id: experienceId },
      });

      if (res.status !== 200) {
        setErrorMessage(res.data.message || "Failed to delete experience");
        return;
      }

      console.log("response: ", res);

      updateExperienceList();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting experience:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes"}
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
