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
import { Textarea } from "../ui/textarea";

interface AddProjectProps {
  updateProjectList: () => void;
}

const AddProject = ({ updateProjectList }: AddProjectProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [projectTypeId, setProjectTypeId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useMyToaster();

  // Fetch categories when the dialog opens
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      const data = response.data;
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProjectTypes = async () => {
    try {
      const response = await axiosInstance.get("type");
      const data = response.data;
      setProjectTypes(data.projectType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchProjectTypes();
    }
  }, [open]);

  const addPortfolio = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/portfolio/add", {
        title,
        description,
        url,
        projectTypeId,
        categoryId,
      });
      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setUrl("");
        setProjectTypeId("");
        setCategoryId("");
        updateProjectList();
        setOpen(false);
        showToast("Created successfully!", "Project has been created", false);
      } else {
        showToast(
          "Oh no! Something went wrong!",
          `${response.data.message}`,
          true
        );
      }
    } catch (error) {
      showToast("Oh no! Something went wrong!", `${error}`, true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                <Textarea
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
                File Type
                <Select onValueChange={(value) => setProjectTypeId(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {projectTypes.map((type) => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <div>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    "Creating..."
                  ) : (
                    <>
                      <Plus /> Add Portfolio
                    </>
                  )}
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
