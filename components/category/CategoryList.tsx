"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCategories(data.category);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex gap-0">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          {categories.map((category) => (
            <SelectContent key={category.id} className="w-full">
              <SelectItem value={category.id}>{category.name}</SelectItem>
            </SelectContent>
          ))}
        </Select>
      </div>
    </>
  );
};

export default CategoryList;
