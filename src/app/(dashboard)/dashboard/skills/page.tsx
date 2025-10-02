import React, { Suspense } from "react";
import Skills from "@/components/skills/Skills";
import { getSkillCategories } from "@/app/actions";
import { fetchSkillCategories } from "@/lib/dataFetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCategory from "@/components/skills/category/AddCategory";
import { Skeleton } from "@/components/ui/skeleton";

const SkillPage = () => {
  // const skillCategories = await getSkillCategories();
  const categories = fetchSkillCategories();
  return (
    <div className="p-2">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Skills</h3>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>List of skill categories and their associated skills.</p>
              <AddCategory />
            </div>
          </div>
        </div>
      </div>
      <Card>
        <CardContent>
          <Suspense
            fallback={
              <div className="px-6 py-4 flex flex-col gap-4">
                <div>
                  <Skeleton className="h-[18px] w-[150px] rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[30px] w-[300px] rounded-full" />
                  <Skeleton className="h-[20px] w-[200px] rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-[30px] w-[300px] rounded-full" />
                  <Skeleton className="h-[20px] w-[200px] rounded-full" />
                </div>
              </div>
            }
          >
            <Skills skillCategories={categories} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillPage;
