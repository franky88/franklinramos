"use client";

import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface DeleleUserProps {
  userId: string;
}

const DeleteUser = ({ userId }: DeleleUserProps) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleRemoveUser = async (userId: string) => {
    if (!userId) {
      toast.error("User is not in the database!");
    }

    try {
      setLoading(true);
      await api.delete(`users/${userId}`);
      toast.success("User remove sucessfully!");
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="rounded-full h-7"
        variant={"destructive"}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? "Removing..." : "Remove"}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRemoveUser(userId)}
              className="bg-red-600 hover:bg-red-700 rounded-full"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteUser;
