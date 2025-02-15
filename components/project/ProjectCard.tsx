import ProjectDetails from "./ProjectDetails";
import Image from "next/image";

interface ProjectCardProps {
  project: Portfolio;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <>
      <div className="relative overflow-hidden group">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={300}
            height={600}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src="/image-holder.png"
            alt={project.title}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 via-blue-200/50 to-transparent text-black p-2 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <strong className="text-lg">{project.title.toUpperCase()}</strong>
            </div>
            <ProjectDetails project={project} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
