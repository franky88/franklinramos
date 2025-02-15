import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ArrowRight } from "lucide-react";

interface ProjectDetailsProps {
  project: Portfolio;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"link"}>
        View <ArrowRight size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{project.category?.name}</DialogDescription>
          {project.category?.name === "videos" ? (
            <video width={500} height={500} controls>
              <source src={project.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={project.url} alt={project.title} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDetails;
