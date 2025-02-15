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
import { Textarea } from "../ui/textarea";
import axiosInstance from "@/lib/axiosInstance";
import { useMyToaster } from "@/utils/mytoast";

interface UpdateExperienceProps {
  updateExperienceList: () => void;
}

const UpdateExperience = ({
  _id,
  position,
  description,
  company,
  startDate,
  endDate,
  isPromoted,
  updateExperienceList,
}: Experience & UpdateExperienceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    position,
    description,
    company,
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    isPromoted,
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
      const res = await axiosInstance.patch("/experience/update", {
        _id: _id,
        position: formData.position,
        description: formData.description,
        company: formData.company,
        isPromoted: formData.isPromoted,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : null,
        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : null,
      });

      if (res.status === 200) {
        setSuccessMessage("Experience updated successfully!");
        updateExperienceList();
        setIsOpen(false);
        showToast("Updated successfully!", `${successMessage}`, false);
      } else {
        setErrorMessage(res.data.message || "Failed to update experience");
        return;
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      setErrorMessage("Something went wrong. Please try again.");
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
            <DialogTitle>Update experience {position}</DialogTitle>
            <DialogDescription>
              Updating the experience will change the details of the experience.
            </DialogDescription>
          </DialogHeader>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div>
              <Label>
                Position:
                <Input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label>
                Company:
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </Label>
            </div>
            <div>
              <Label className="flex flex-col gap-1">
                Description
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={handleChange}
                />
                <small className="text-slate-500">
                  Please use comma "," to separate items
                </small>
              </Label>
            </div>
            <div>
              <Label className="flex flex-col gap-1">
                Start Date
                <Input
                  type="date"
                  value={
                    formData.startDate
                      ? formData.startDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value
                        ? new Date(e.target.value)
                        : null, // Ensure `null` handling
                    }))
                  }
                />
              </Label>
            </div>
            <div>
              <Label className="flex flex-col gap-1">
                End Date
                <Input
                  type="date"
                  value={
                    formData.endDate
                      ? formData.endDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value ? new Date(e.target.value) : null,
                    }))
                  }
                />
              </Label>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={formData.isPromoted}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPromoted: e.target.checked,
                    }))
                  }
                  className="w-4 h-4"
                />
                <span>Promoted</span>
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

export default UpdateExperience;
