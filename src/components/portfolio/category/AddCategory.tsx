"use client";

import { useState } from "react";
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
import api from "@/lib/axios";

interface AddCategoryProps {
  fetchCategoriesData?: () => void;
}

const AddCategory = ({ fetchCategoriesData }: AddCategoryProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      toast.info("Name is required");
    }
    setLoading(true);

    try {
      await api.post("portfolio-categories", {
        name,
      });
      setName("");
      toast.success("Portfolio category created successfully");
      setOpen(false);
      router.refresh();

      fetchCategoriesData?.();
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
        variant={"outline"}
        disabled={loading}
      >
        {loading ? (
          "Adding..."
        ) : (
          <>
            <Plus /> Add
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new portfolio category</DialogTitle>
            <DialogDescription>
              Fill in the information below to add a new portfolio category.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="w-full">
              <Label htmlFor="name">Title</Label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Button
                onClick={handleSubmit}
                className="rounded-full"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add category"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategory;
