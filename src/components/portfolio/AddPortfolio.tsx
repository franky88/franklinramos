"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { getPortfolioCategories } from "@/app/actions";
import { PortfolioCategory } from "@prisma/client";
import api from "@/lib/axios";

interface AddPortfolioProps {
  fetchPortfoliosData: () => void;
}

const AddPortfolio = ({ fetchPortfoliosData }: AddPortfolioProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [hidden, setHidden] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getPortfolioCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!title) {
      toast.info("Title is required");
    }
    setLoading(true);

    try {
      const res = await api.post("portfolios", {
        title,
        description,
        imageUrl,
        projectUrl,
        isHidden: hidden,
        categoryId: categoryId,
      });

      console.log("Response:", res);

      if (res.status === 201) {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setProjectUrl("");
        setCategoryId("");
        setHidden(false);
        toast.success("Portfolio created successfully");
        setOpen(false);
        router.refresh();

        fetchPortfoliosData();
      } else {
        toast.error("Failed to create portfolio");
      }
    } catch (error) {
      console.error("Error creating portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="h-7 rounded-full"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? (
          "Adding..."
        ) : (
          <>
            <Plus /> Add portfolio
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new portfolio</DialogTitle>
            <DialogDescription>
              Fill in the information below to add a new portfolio.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="w-full">
              <Label htmlFor="name">Title</Label>
              <Input
                type="text"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="icon">Image URL</Label>
              <Input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="icon">Project URL</Label>
              <Input
                type="text"
                placeholder="Project URL"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="category">Category</Label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId || ""}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex items-center gap-2">
              <input
                type="checkbox"
                id="hidden"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="hidden">Hide</Label>
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="rounded-full"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add portfolio"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPortfolio;
