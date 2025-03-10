import ProjectDetails from "./ProjectDetails";
import Image from "next/image";

interface ProjectCardProps {
  project: Portfolio;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <>
      <div className="relative overflow-hidden group">
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
            width={450}
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

        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-500 via-gray-900/50 to-transparent text-white p-2 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0">
              <strong className="text-lg">{project.title.toUpperCase()}</strong>
              <small>{project.categoryName}</small>
            </div>
            <ProjectDetails project={project} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
