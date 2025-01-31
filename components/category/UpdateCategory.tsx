import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMyToaster } from "@/utils/mytoast";

interface UpdateCategoryProps {
  updateCategoryList: () => void;
}

const UpdateCategory = ({
  id,
  name,
  updateCategoryList,
}: Category & UpdateCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
  });
  const showToast = useMyToaster();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/category/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        showToast(
          "Oh no! Something went wrong!",
          `Error: ${data.message}`,
          true
        );
        return;
      }

      // const updatedCategory = await response.json();
      updateCategoryList();
      setIsOpen(false);
      showToast("Updated successfully!", "Category name has been updated.");
    } catch (error) {
      showToast("Oh no! Something went wrong!", `Error: ${error}`, true);
    }
  };
  return (
    <>
      <Button variant={"link"} size={"sm"} onClick={() => setIsOpen(true)}>
        <Edit className="h-7 text-green-500" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update category {name}</DialogTitle>
            <DialogDescription>
              Updating the category will change the details of the category.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div>
              <Label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategory;
