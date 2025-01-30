"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useMyToaster } from "@/utils/mytoast";

interface AddExperienceProps {
  onExperienceAdded: () => void;
}

const AddExperience = ({ onExperienceAdded }: AddExperienceProps) => {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isWithLine, setIsWithLine] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const showToast = useMyToaster();

  const addExperience = async () => {
    try {
      const response = await fetch("/api/experience/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position,
          description,
          company,
          startDate,
          endDate,
          isWithLine,
        }),
      });

      if (!response.ok) {
        // Handle response error
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add experience");
      }

      // Clear form on success
      setPosition("");
      setDescription("");
      setCompany("");
      setStartDate("");
      setEndDate("");
      setIsWithLine(false);
      onExperienceAdded();
      setOpen(false);
      showToast("Created successfully!", "Experience has been created", false);
    } catch (error: any) {
      showToast("Oh no! Something went wrong", `${error.message}`, true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!position || !description || !company || !startDate || !endDate) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    await addExperience();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Experience
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
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
                Position
                <Input
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Company
                <Input
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                Description
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <small className="text-slate-500">
                  Please use comma "," to separate items
                </small>
              </Label>
              <Label className="flex flex-col gap-1">
                Start Date
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Label>
              <Label className="flex flex-col gap-1">
                End Date
                <Input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Label>
              <div>
                <Label className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    checked={isWithLine}
                    onChange={(e) => setIsWithLine(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Promoted</span>
                </Label>
              </div>
              <div>
                <Button type="submit">Add Experience</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddExperience;
