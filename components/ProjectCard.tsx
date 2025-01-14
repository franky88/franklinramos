import { Button } from "./ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
}

const ProjectCard = ({ title, description, url }: ProjectCardProps) => {
  return (
    <div className="flex flex-col">
      <video width={320} height={240} controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-start mt-2">
        <strong className="text-lg">{title}</strong>
        <small className="text-gray-600">{description}</small>
        <Button variant={"link"} size={"sm"} className="h-7 mt-2">
          View details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
