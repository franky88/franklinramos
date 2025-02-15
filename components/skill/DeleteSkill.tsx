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
import { useMyToaster } from "@/utils/mytoast";

interface DeleteExperienceProps {
  skillId: string;
  updateSkillList: () => void;
}

const DeleteSkill = ({ skillId, updateSkillList }: DeleteExperienceProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useMyToaster();

  const deleteExperience = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete("/skill/remove", {
        data: { id: skillId },
      });

      if (res.status !== 200) {
        setErrorMessage(res.data.message || "Failed to delete skill");
        return;
      }
      updateSkillList();
      setOpen(false);
      showToast("Deleted successfully!", "Skill deleted successfully.", false);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      showToast("Deleted successfully!", `${errorMessage}`, true);
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

export default DeleteSkill;
