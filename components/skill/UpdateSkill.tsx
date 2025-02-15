import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
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
import { useMyToaster } from "@/utils/mytoast";

interface UpdateExperienceProps {
  skill: Skill;
  updateSkillList: () => void;
}

const UpdateSkill = ({ skill, updateSkillList }: UpdateExperienceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: skill.name,
    application: skill.application,
    mastery: skill.mastery,
  });
  const showToast = useMyToaster();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosInstance.patch("/skill/update", {
        _id: skill._id,
        name: formData.name,
        application: formData.application,
        mastery: Number(formData.mastery),
      });

      if (res.status === 200) {
        setSuccessMessage("Skill updated successfully!");
        updateSkillList();
        setIsOpen(false);
        showToast("Updated successfully!", `${successMessage}`, false);
      } else {
        setErrorMessage(res.data.message || "Failed to update skill");
        return;
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      showToast("Oh no! Something went wrong!", `${errorMessage}`, true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button variant={"link"} size={"sm"} onClick={() => setIsOpen(true)}>
        <Edit className="h-7 text-green-500" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update experience {skill.name}</DialogTitle>
            <DialogDescription>
              Updating the experience will change the details of the experience.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div>
              <Label>
                Name:
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                Application:
                <Input
                  type="text"
                  name="application"
                  value={formData.application}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                Mastery:
                <Input
                  type="number"
                  name="mastery"
                  value={formData.mastery}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Button type="submit" disabled={loading} size={"sm"}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateSkill;
