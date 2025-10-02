"use client";

import { useState } from "react";
import { createSkillCategory } from "@/app/actions";
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

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      toast.info("Name is required");
    }

    setLoading(true);

    try {
      await createSkillCategory({ name, description, icon });
      setName("");
      setDescription("");
      setIcon("");
      toast.success("Skill category created successfully");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating skill category:", error);
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
            <Plus /> Add category
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new skill category</DialogTitle>
            <DialogDescription>
              Fill in the information below to add a new skill category.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <Label htmlFor="icon">Icon</Label>
              <Input
                type="text"
                placeholder="Icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
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
