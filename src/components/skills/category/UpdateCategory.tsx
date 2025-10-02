"use client";

import { useState } from "react";
import { updateSkillCategory } from "@/app/actions";
import { SkillCategory } from "@prisma/client";
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
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, X } from "lucide-react";
import DeleteSkill from "../DeleteSkill";
import UpdateSkill from "../UpdateSkill";

type SkillCategoryWithSkills = SkillCategory & { skills: Skill[] };

interface UpdateCategoryProps {
  skillCategory: SkillCategoryWithSkills;
}

const UpdateCategory = ({ skillCategory }: UpdateCategoryProps) => {
  const [name, setName] = useState(skillCategory.name);
  const [description, setDescription] = useState(
    skillCategory.description || ""
  );
  const [icon, setIcon] = useState(skillCategory.icon || "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name) {
      toast.info("Name is required");
    }

    setLoading(true);
    try {
      await updateSkillCategory({
        skillCategoryId: skillCategory.id,
        name,
        description,
        icon,
      });
      setName("");
      setDescription("");
      setIcon("");
      toast.success("Skill category updated successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating skill category:", error);
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
            <DialogTitle>
              Update skill category: {skillCategory.name}
            </DialogTitle>
            <DialogDescription>
              Fill in the information below to update the skill category.
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
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-dashed border-gray-200 w-full">
              {skillCategory.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  className="bg-green-500 text-white dark:bg-green-600 rounded-full flex gap-2 items-center justify-between"
                >
                  <BadgeCheckIcon className="h-4 w-4" />
                  <UpdateSkill skill={skill} />{" "}
                  <DeleteSkill skillID={skill.id} text="x" />
                </Badge>
              ))}
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="rounded-full"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update category"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategory;
