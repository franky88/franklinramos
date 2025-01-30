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

interface DeleteProjectProps {
  productId: number;
  setProjects: () => void;
}

const DeleteProject = ({ productId, setProjects }: DeleteProjectProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const showToast = useMyToaster();

  const deletePortfolio = async () => {
    try {
      const response = await fetch(`/api/portfolio/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }), // Pass the portfolio ID
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to delete portfolio");
        showToast(
          "Oh no! SOmething went wrong!",
          "Failed to delete project",
          true
        );
        return;
      }

      // Remove the deleted portfolio from the state
      setProjects();
      setOpen(false); // Close the dialog after successful deletion
      showToast("Deleted successfully!", "Project has been deleted", false);
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

export default DeleteProject;
