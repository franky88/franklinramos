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

interface AddCategoryProps {
  updateCategoryList: () => void;
}

const AddCategory = ({ updateCategoryList }: AddCategoryProps) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const showToast = useMyToaster();

  const addCategory = async () => {
    const response = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      setName("");
      updateCategoryList();
      setIsOpen(false);
      showToast("Created successfully!", "Category has been created");
    } else {
      const errorData = await response.json();
      showToast(
        "Oh no! Something went wrong!",
        `Error: ${errorData.message}`,
        true
      );
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCategory();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus /> Category
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <DialogDescription>
              Add a new category to the list of categories.
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
              <Button type="submit">
                <Plus /> Category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategory;
