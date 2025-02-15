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
import axiosInstance from "@/lib/axiosInstance";

interface UpdateCategoryProps {
  category: Category;
  updateCategoryList: () => void;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  category,
  updateCategoryList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: category.name });
  const [loading, setLoading] = useState(false);
  const showToast = useMyToaster();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.patch("/category/update", {
        id: category._id,
        name: formData.name,
      });

      showToast(
        "Updated successfully!",
        "Category name has been updated.",
        false
      );
      updateCategoryList();
      setIsOpen(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      showToast("Oh no! Something went wrong!", message, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="link" size="sm" onClick={() => setIsOpen(true)}>
        <Edit className="h-7 text-green-500" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update category</DialogTitle>
            <DialogDescription>
              Update the category details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label className="flex flex-col gap-1">
                Name:
                <Input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Label>
              <div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategory;
