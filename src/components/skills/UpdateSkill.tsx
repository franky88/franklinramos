"use client";

import { useState } from "react";
import { updateSkill } from "@/app/actions";
import { Skill } from "@prisma/client";
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

interface UpdateSkillProps {
  skill: Skill;
}

const UpdateSkill = ({ skill }: UpdateSkillProps) => {
  const [name, setName] = useState(skill.name);
  const [level, setLevel] = useState(skill.level || "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      toast.info("Name is required");
    }

    setLoading(true);

    try {
      await updateSkill({ skillId: skill.id, name, level });
      setName("");
      setLevel("");
      toast.success("Skill updated successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating skill:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={loading}
        // variant={"outline"}
      >
        {loading ? "Updating..." : skill.name}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update skill: {skill.name}</DialogTitle>
            <DialogDescription>
              Make changes to your skill here. Click save when you're done.
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
                {loading ? "Updating..." : "Update skill"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateSkill;
