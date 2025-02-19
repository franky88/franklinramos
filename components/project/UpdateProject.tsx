import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import axiosInstance from "@/lib/axiosInstance";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Edit } from "lucide-react";
import { useMyToaster } from "@/utils/mytoast";

interface UpdateProjectProps {
  portfolio: Portfolio;
  updateProjectList: () => void;
}

const UpdateProject = ({
  portfolio,
  updateProjectList,
}: UpdateProjectProps) => {
  const [formData, setFormData] = useState({
    title: portfolio.title,
    description: portfolio.description,
    url: portfolio.url,
    imageUrl: portfolio.imageUrl,
    categoryId: portfolio.categoryId,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useMyToaster();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      const data = response.data;
      console.log("Fetched categories:", data);
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axiosInstance.patch("/portfolio/update", {
        id: portfolio._id,
        ...formData,
      });

      if (response.status === 200) {
        setSuccessMessage("Portfolio updated successfully!");
        updateProjectList();
        setIsOpen(false);
        showToast("Updated successfully!", "Project has been updated", false);
      } else {
        setErrorMessage(response.data.message || "Failed to update portfolio");
        showToast(
          "Oh no! Something went wrong!",
          "Failed to update project",
          true
        );
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            <DialogTitle>Update portfolio {portfolio.title}</DialogTitle>
            <DialogDescription>
              Updating the portfolio will change the details of the portfolio.
            </DialogDescription>
          </DialogHeader>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div>
              <Label>
                Title:
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                Description:
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                URL:
                <Input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                Image URL:
                <Input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label className="flex flex-col gap-1">
                Category
                <Select
                  onValueChange={handleCategoryChange}
                  value={formData.categoryId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProject;
