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

interface UploadProjectProps {
  updateProjectList: () => void;
}

const UploadProject = ({ updateProjectList }: UploadProjectProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [projectTypeId, setProjectTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [projectTypeName, setProjectTypeName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const showToast = useMyToaster();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      const data = response.data;
      console.log("category data", data);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const addPortfolio = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/sufy/upload?fileName=${encodeURIComponent(file.name)}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} - ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server");
      }

      const data = await res.json();
      const url = data.url.split("?")[0];

      if (!data.url) {
        throw new Error("No upload URL received");
      }

      const uploadResponse = await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }
      showToast("Successfully uploaded!", "FIle uploaded to the server", false);

      const response = await axiosInstance.post("/portfolio/add", {
        title,
        description,
        url: url,
        projectTypeName: projectTypeName,
        projectTypeId,
        categoryId,
        categoryName: categoryName,
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
                <Input type="file" onChange={handleFileChange} />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </Label>
              <Label className="flex flex-col gap-1">
                File Type
                <Select
                  onValueChange={(value) => {
                    const selectedType = projectTypes.find(
                      (type) => type._id === value
                    );
                    setProjectTypeId(value);
                    setProjectTypeName(selectedType?.name || "");
                  }}
                >
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
                <Select
                  onValueChange={(value) => {
                    const selectedCategory = categories.find(
                      (type) => type._id === value
                    );
                    setCategoryId(value);
                    setCategoryName(selectedCategory?.name || "");
                  }}
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

export default UploadProject;
