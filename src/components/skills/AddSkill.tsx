"use client";

import { useState } from "react";
import { createSkill } from "@/app/actions";
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

interface AddSkillProps {
  skillCategoryID?: string;
}

const AddSkill = ({ skillCategoryID }: AddSkillProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      toast.info("Name is required");
    }

    setLoading(true);

    try {
      if (!skillCategoryID) {
        const data = { name, level };
        await createSkill(data);
      } else {
        const data = { name, level, skillCategoryId: skillCategoryID };
        await createSkill(data);
      }
      setName("");
      setLevel("");
      toast.success("Skill created successfully");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating skill:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        className="h-7 w-full text-start hover:bg-gray-100 rounded-md px-2 text-sm"
        // variant={"outline"}
      >
        {loading ? "Adding..." : "Add"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new skill</DialogTitle>
            <DialogDescription>
              Fill in the information below to add a new skill.
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
              <Label htmlFor="level">Proficiency</Label>
              <Input
                type="text"
                placeholder="Proficiency"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="rounded-full"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add skill"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSkill;
