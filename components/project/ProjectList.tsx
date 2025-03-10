"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteProject from "./DeleteProject";
import UpdateProject from "./UpdateProject";
import { SignedIn } from "@clerk/nextjs";
import AddCategory from "../category/AddCategory";
import axiosInstance from "@/lib/axiosInstance";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryList from "../category/CategoryList";
import UploadProject from "./UploadProject";
import ProjectTypeList from "../type/ProjectTypeList";

const ProjectList = () => {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async (categoryId: string | null = null) => {
    try {
      setLoading(true);
      const queryParam =
        categoryId && categoryId !== "all" ? `?categoryId=${categoryId}` : "";
      const res = await axiosInstance.get(`/portfolio${queryParam}`);
      setProjects(res.data.portfolio || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/category");
      const data = res.data;

      if (Array.isArray(data.categories)) {
        setCategories([{ _id: "all", name: "All" }, ...data.categories]);
      } else {
        setCategories([{ _id: "all", name: "All" }]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([{ _id: "all", name: "All" }]); // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProjects(category === "all" ? null : category);
  };

  const skeletonHeights = [200, 250, 300, 350];

  if (loading) {
    return (
      <>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div className="masonry-grid-item" key={index}>
              <Skeleton
                className={`h-${
                  skeletonHeights[index % skeletonHeights.length]
                } w-[350px] rounded-xl`}
              />
            </div>
          ))}
      </>
    );
  }

  return (
    <div>
      {/* Filter Section */}
      <div>
        <div className="p-2 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SlidersHorizontal className="w-4" />
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category._id} key={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SignedIn>
              <div className="flex items-center gap-4">
                <CategoryList
                  updateCategoryData={fetchCategories}
                  categories={categories}
                />
                <AddCategory updateCategoryList={fetchCategories} />
                <ProjectTypeList />
                <UploadProject updateProjectList={fetchProjects} />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="scrollable-grid">
        <div className="masonry-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="masonry-grid-item">
                <ProjectCard project={project} />
                <SignedIn>
                  <div className="flex items-center mt-1 mb-5">
                    <UpdateProject
                      portfolio={project}
                      updateProjectList={fetchProjects}
                    />
                    <DeleteProject
                      productId={project._id}
                      setProjects={fetchProjects}
                    />
                  </div>
                </SignedIn>
              </div>
            ))
          ) : (
            <p>No projects found for the selected category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
