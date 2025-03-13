import { useMyToaster } from "@/utils/mytoast";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/axiosInstance";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddSkillProps {
  onSkillAdded: () => void;
}

const AddSkill = ({ onSkillAdded }: AddSkillProps) => {
  const [name, setName] = useState("");
  const [application, setApplication] = useState("");
  const [mastery, setMastery] = useState("");
  const [skillType, setSkillType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const showToast = useMyToaster();

  const addSkill = async () => {
    try {
      setLoading(true);

      const masteryValue = Number(mastery);

      if (isNaN(masteryValue) || masteryValue < 1 || masteryValue > 10) {
        showToast(
          "Invalid mastery value",
          "Mastery must be a number between 1 and 10.",
          true
        );
        return;
      }

      const response = await axiosInstance.post("/skill/add", {
        name,
        application,
        skillType,
        mastery: masteryValue,
      });

      if (response.status !== 201) {
        showToast(
          "Oh no! Something went wrong!",
          `Error: ${response.data.message}`,
          true
        );
        throw new Error(response.data.message || "Failed to add skill");
      }

      // Reset form fields
      setName("");
      setApplication("");
      setMastery("");
      setSkillType("");
      onSkillAdded();
      setOpen(false);
      showToast("Created successfully!", "Skill has been created", false);
    } catch (error: any) {
      showToast("Oh no! Something went wrong", `${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !application || !mastery) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    await addSkill();
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Skill
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>Add additional skills</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {message && (
              <div
                className={`p-2 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Label className="flex flex-col gap-1">
                Name
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Application
                <Input
                  placeholder="Application"
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Mastery
                <Input
                  type="number"
                  placeholder="Mastery"
                  value={mastery}
                  onChange={(e) => setMastery(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Skill Type
                <Select onValueChange={(value) => setSkillType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a skill type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Languages">Languages</SelectItem>
                      <SelectItem value="Applications">Applications</SelectItem>
                      <SelectItem value="Skills">Skills</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Add Skill"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSkill;
