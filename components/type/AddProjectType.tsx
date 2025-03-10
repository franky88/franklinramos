"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useMyToaster } from "@/utils/mytoast";
import axiosInstance from "@/lib/axiosInstance";

interface AddProjectTypeProps {
  updateTypeList: () => void;
}

const AddProjectType = ({ updateTypeList }: AddProjectTypeProps) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useMyToaster();

  const addCategory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/type", {
        name,
      });

      if (response.status === 201) {
        setName("");
        updateTypeList();
        setIsOpen(false);
        showToast("Created successfully!", "Category has been created");
      } else {
        const errorData = await response.data;
        showToast(
          "Oh no! Something went wrong!",
          `Error: ${errorData.message}`,
          true
        );
      }
    } catch (error) {
      showToast("Oh no! Something went wrong!", `Error: ${error}`, true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCategory();
  };
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"sm"}
        className="h-7"
        variant={"link"}
      >
        <Plus /> Type
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add type</DialogTitle>
            <DialogDescription>
              Add a new project type to the list of types.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmitCategory}
            className="flex flex-col justify-center gap-3"
          >
            <div>
              <Label>
                Name:
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Label>
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Plus /> Type
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectType;
