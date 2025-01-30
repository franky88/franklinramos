import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/axiosInstance";
import ProjectDetails from "./ProjectDetails";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  categoryId: string;
}

const ProjectCard = ({
  title,
  description,
  url,
  imageUrl,
  categoryId,
}: ProjectCardProps) => {
  const [category, setCategory] = useState<string>("");

  const fetchCategory = async (categoryId: string) => {
    try {
      const response = await axiosInstance.get(`/category/${categoryId}`);
      console.log("Fetched category:", response.data);
      const data = response.data;
      setCategory(data.category.name);
    } catch (error) {
      console.error("Failed to fetch category:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <div className="relative overflow-hidden group">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={600}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src="/image-holder.png"
            alt={title}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 via-blue-200/50 to-transparent text-black p-2 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <strong className="text-lg">{title}</strong>
              <small>
                {description} - {category}
              </small>
            </div>
            <ProjectDetails
              title={title}
              description={description}
              url={url}
              categoryName={category}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
