"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSkill } from "@/app/actions";
import { toast } from "sonner";

interface DeleteSkillProps {
  skillID: string;
  text: string;
}

const DeleteSkill = ({ skillID, text }: DeleteSkillProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!skillID) {
      toast.error("Skill ID is required");
      return;
    }
    setLoading(true);
    try {
      // Simulate a delay for demonstration purposes
      await deleteSkill(skillID);
      toast.success("Skill deleted successfully");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className="hover:text-red-900 hover:bg-red-100 rounded-full text-sm text-center w-5 h-5"
      >
        {loading ? "Deleting..." : text}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              skill.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete()}
              className="bg-red-600 hover:bg-red-700 rounded-full"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, delete skill"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSkill;
