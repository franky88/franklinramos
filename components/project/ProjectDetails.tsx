import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axiosInstance from "@/lib/axiosInstance";
import { ArrowRight } from "lucide-react";

interface ProjectDetailsProps {
  title: string;
  description: string;
  url: string;
  categoryName: string;
}

const ProjectDetails = ({
  title,
  description,
  url,
  categoryName,
}: ProjectDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"link"}>
        View <ArrowRight size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {description} - {categoryName}
          </DialogDescription>
          {categoryName === "videos" ? (
            <video width={500} height={500} controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={url} alt={title} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDetails;
