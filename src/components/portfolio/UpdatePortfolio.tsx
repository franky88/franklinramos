"use client";

import { useEffect, useState } from "react";
import { getPortfolioCategories } from "@/app/actions";
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
import { Portfolio } from "@prisma/client";
import { PortfolioCategory } from "@prisma/client";
import api from "@/lib/axios";

type PortfolioWithCategory = Portfolio & {
  portfolioCategory: PortfolioCategory | null; // allow null
};

interface UpdatePortfolioProps {
  portfolioId: string;
  fetchPortfoliosData: () => void;
}

const UpdatePortfolio = ({
  portfolioId,
  fetchPortfoliosData,
}: UpdatePortfolioProps) => {
  const [portfolio, setPortfolio] = useState<PortfolioWithCategory | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [hidden, setHidden] = useState(false);

  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get(`portfolios/${portfolioId}`);
        setPortfolio(res.data);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const data = await getPortfolioCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
    fetchPortfolio();
  }, [portfolioId]);

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title);
      setDescription(portfolio.description || "");
      setImageUrl(portfolio.imageUrl || "");
      setProjectUrl(portfolio.projectUrl || "");
      setCategoryId(portfolio.portfolioCategory?.id || "");
      setHidden(portfolio.isHidden || false);
    }
  }, [portfolio]);

  const handleSubmit = async () => {
    if (!title) {
      toast.info("Title is required");
    }
    setLoading(true);
    try {
      const res = await api.put(`portfolios/${portfolioId}`, {
        title,
        description,
        imageUrl,
        projectUrl,
        isHidden: hidden,
        categoryId: categoryId,
      });
      if (res.status !== 200) {
        toast.error("Failed to update portfolio");
      }
      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");
      setCategoryId("");
      setHidden(false);
      toast.success("Portfolio updated successfully");
      setOpen(false);
      router.refresh();

      fetchPortfoliosData();
    } catch (error) {
      console.error("Error updating portfolio:", error);
      toast.error("There was an error updating the portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="h-7 w-full text-start hover:bg-gray-100 rounded-md px-2 text-sm"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? "Updating..." : <>Update</>}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update portfolio: {title}</DialogTitle>
            <DialogDescription>
              Fill in the information below to update the portfolio.
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
              <Label htmlFor="hidden">{hidden ? "Unpublish" : "Publish"}</Label>
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="rounded-full"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePortfolio;
