import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";
import { useMyToaster } from "@/utils/mytoast";
import axiosInstance from "@/lib/axiosInstance";

interface DeleteProjectProps {
  productId: string;
  setProjects: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({
  productId,
  setProjects,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useMyToaster();

  const deletePortfolio = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete("/portfolio/remove", {
        data: { id: productId }, // Ensure 'id' matches API expectation
      });

      console.log("Response:", res);
      setProjects();
      setOpen(false);
      showToast("Deleted successfully!", "Project has been deleted", false);
    } catch (error: any) {
      console.error("Error deleting portfolio:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(errorMessage);
      showToast("Oh no! Something went wrong!", errorMessage, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="link"
        size="sm"
        className="h-7 text-red-500"
      >
        <Trash2 />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this project?
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete the item.
            </DialogDescription>
          </DialogHeader>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={deletePortfolio}
              size="sm"
              variant="destructive"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes"}
            </Button>
            <Button onClick={() => setOpen(false)} size="sm" variant="outline">
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProject;
