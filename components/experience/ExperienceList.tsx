"use client";

import { CircleDot, CircleChevronUp, Edit, Trash2 } from "lucide-react";
import ExperienceDialog from "./ExperienceDialog";
import { SignedIn } from "@clerk/nextjs";
import AddExperience from "./AddExperience";
import { useEffect, useState } from "react";
import DeleteExperience from "./DeleteExperience";
import UpdateExperience from "./UpdateExperience";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

const ExperienceList = () => {
  const [experience, setExperience] = useState<Experience[]>([]);

  const fetchExperience = async () => {
    const response = await fetch("/api/experience");
    const data = await response.json();
    setExperience(data.experience);
  };

  useEffect(() => {
    fetchExperience();
  }, []);
  return (
    <>
      <div>
        <div className="p-2 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <SignedIn>
              <div className="flex items-center gap-4">
                <AddExperience onExperienceAdded={fetchExperience} />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      <div>
        <div>
          {experience.map((ex) => (
            <div className="flex gap-2 items-start" key={ex.id}>
              <div className="text-blue-900">
                {ex.isWithLine ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="link">
                          <CircleChevronUp className="w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-green-500">
                        <p>Promoted</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="link">
                          <CircleDot className="w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800">
                        <p>Starting a new job</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {ex.isWithLine ? <div className="vertical-line"></div> : false}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <div className="w-full">
                    <ExperienceDialog
                      title={ex.position.toUpperCase()}
                      description={ex.description}
                      startDate={ex.startDate}
                      endDate={ex.endDate}
                    />
                  </div>
                  <SignedIn>
                    <div className="float-right flex">
                      <UpdateExperience
                        id={ex.id}
                        position={ex.position}
                        company={ex.company}
                        description={ex.description}
                        isWithLine={ex.isWithLine}
                        startDate={ex.startDate}
                        endDate={ex.endDate}
                        updateExperienceList={fetchExperience}
                      />
                      <DeleteExperience
                        experienceId={ex.id}
                        updateExperienceList={fetchExperience}
                      />
                    </div>
                  </SignedIn>
                </div>
                <strong>
                  {ex.company ? ex.company : <strong>Loading...</strong>}
                </strong>
                <small>
                  From{" "}
                  {ex.startDate
                    ? new Date(ex.startDate).getUTCFullYear()
                    : "N/A"}{" "}
                  to{" "}
                  {ex.endDate
                    ? new Date(ex.endDate).getUTCFullYear()
                    : "Present"}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExperienceList;
