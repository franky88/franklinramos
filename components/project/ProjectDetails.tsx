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
import Image from "next/image";

interface ProjectDetailsProps {
  project: Portfolio;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="text-black"
      >
        View <ArrowRight size={16} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{project.categoryName}</DialogDescription>
          {project.projectTypeName == "images" && (
            <Image
              src={project.url}
              alt={project.title}
              width={300}
              height={600}
              className="object-cover w-full h-full"
            />
          )}

          {project.projectTypeName == "pdf" && (
            <iframe
              src={project.url}
              width={460}
              height={700}
              // className="object-cover w-full h-full"
            />
          )}

          {project.projectTypeName == "videos" && (
            <video controls className="object-cover w-full h-full">
              <source src={project.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDetails;
