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
import { deletePortfolioCategory } from "@/app/actions";
import { toast } from "sonner";

interface DeleteCategoryProps {
  portfolioCategoryId: string;
  fetchCategoriesData?: () => void;
}

const DeleteCategory = ({
  portfolioCategoryId,
  fetchCategoriesData,
}: DeleteCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!portfolioCategoryId) {
      toast.error("Portfolio category ID is required");
      return;
    }
    setLoading(true);
    try {
      await deletePortfolioCategory(portfolioCategoryId);
      toast.success("Portfolio category deleted successfully");
      router.refresh();
      setOpen(false);

      fetchCategoriesData && fetchCategoriesData();
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
        className="text-red-600 hover:bg-red-100 hover:rounded-full px-2"
      >
        {loading ? "Removing" : "Remove"}
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              portfolio category and remove all associated data.
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
