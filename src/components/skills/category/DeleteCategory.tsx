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
import { deleteSkillCategory } from "@/app/actions";
import { toast } from "sonner";

interface DeleteCategoryProps {
  skillCategoryID: string;
}

const DeleteCategory = ({ skillCategoryID }: DeleteCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!skillCategoryID) {
      toast.error("Skill category ID is required");
      return;
    }
    setLoading(true);
    try {
      // Simulate a delay for demonstration purposes
      await deleteSkillCategory(skillCategoryID);
      toast.success("Skill category deleted successfully");
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
        className="hover:text-red-900 hover:bg-red-100 h-7 w-full text-start rounded-md px-2 text-sm"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              skill category and remove all associated skills.
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
              {loading ? "Deleting..." : "Yes, delete category"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteCategory;
