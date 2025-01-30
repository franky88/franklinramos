"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axiosInstance from "@/lib/axiosInstance";
import { useMyToaster } from "@/utils/mytoast";

interface AddProjectProps {
  updateProjectList: () => void;
}

const AddProject = ({ updateProjectList }: AddProjectProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState(""); // State for category selection
  const [categories, setCategories] = useState<Category[]>([]); // State for fetched categories
  const [open, setOpen] = useState(false);
  const showToast = useMyToaster();

  // Fetch categories when the dialog opens
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      const data = response.data;
      console.log("Fetched categories:", data); // Debugging log
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const addPortfolio = async () => {
    const response = await fetch("/api/portfolio/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, url, imageUrl, categoryId }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setUrl("");
      setCategoryId(""); // Reset category
      updateProjectList();
      setOpen(false);
      showToast("Created successfully!", "Project has been created", false);
    } else {
      const errorData = await response.json();
      showToast("Oh no! Something went wrong!", `${errorData.message}`, true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", {
      title,
      description,
      url,
      categoryId,
      imageUrl,
    });
    await addPortfolio();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="float-right">
        <Plus /> Portfolio
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <strong>Add Portfolio</strong>
            </DialogTitle>
            <DialogDescription>
              Add a new portfolio item to your portfolio list.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Label className="flex flex-col gap-1">
                Title
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Description
                <Input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                URL
                <Input
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Image URL
                <Input
                  placeholder="image URL"
                  value={imageUrl || ""}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Category
                <Select onValueChange={(value) => setCategoryId(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <div>
                <Button type="submit">
                  <Plus /> Add Portfolio
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProject;
