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
import api from "@/lib/axios";
import { toast } from "sonner";

interface DeletePortfolioProps {
  portfolioID: string;
  fetchPortfoliosData?: () => void;
}

const DeletePortfolio = ({
  portfolioID,
  fetchPortfoliosData,
}: DeletePortfolioProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!portfolioID) {
      toast.error("Portfolio category ID is required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.delete(`portfolios/${portfolioID}`);
      if (res.status === 200) {
        toast.success("Portfolio deleted successfully");
        setOpen(false);
        router.refresh();

        fetchPortfoliosData && fetchPortfoliosData();
      } else {
        toast.error("Failed to delete portfolio");
      }
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
              portfolio and remove all associated data.
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
              {loading ? "Deleting..." : "Yes, delete portfolio"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeletePortfolio;
