"use client";

import { CircleDot, CircleChevronUp, Star } from "lucide-react";
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
import AddSkill from "../skill/AddSkill";
import axiosInstance from "@/lib/axiosInstance";
import { useMyToaster } from "@/utils/mytoast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader } from "../ui/card";

const ExperienceList = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const showToast = useMyToaster();

  const fetchExperience = async () => {
    const response = await axiosInstance.get("/experience");
    const data = await response.data;
    setExperience(data.experience);
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosInstance.get("/skill");
      const data = response.data;
      setSkills(data.skills || []);
    } catch (error) {
      showToast("Oh no! Something went wrong!", `Error: ${error}`, true);
    }
  };

  useEffect(() => {
    fetchExperience();
    fetchSkills();
  }, []);
  return (
    <>
      <div>
        <div className="p-2 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <SignedIn>
              <div className="flex items-center gap-4">
                <AddExperience onExperienceAdded={fetchExperience} />
                <AddSkill onSkillAdded={fetchSkills} />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div>
        <div className="scrollable-grid">
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

          <Card className="mt-5 rounded-none border-none">
            <CardHeader>Skill mastery level</CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center justify-between">
                        <div>Skills</div>
                        <div>Level</div>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {skill.name}
                            <small className="text-slate-500">
                              (Application used: {skill.application})
                            </small>
                          </div>
                          <div className="flex gap-1">
                            {Array(skill.mastery)
                              .fill(null)
                              .map((_, index) => (
                                <Star
                                  key={`star-${skill.id}-${index}`} // Ensure unique keys for stars
                                  className="w-4 text-yellow-500 hover:w-5 duration-300"
                                  fill={"yellow"}
                                />
                              ))}
                            {Array(10.0 - skill.mastery)
                              .fill(null)
                              .map((_, index) => (
                                <Star
                                  key={`star-${skill.id}-${index}`} // Ensure unique keys for stars
                                  className="w-4 text-yellow-500"
                                />
                              ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ExperienceList;
