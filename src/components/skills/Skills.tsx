import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SkillCategory } from "@prisma/client";
import { Skill } from "@prisma/client";
import { Button } from "../ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DeleteCategory from "./category/DeleteCategory";
import AddSkill from "./AddSkill";
import UpdateCategory from "./category/UpdateCategory";
import { IconDotsVertical } from "@tabler/icons-react";
import DeleteSkill from "./DeleteSkill";
import UpdateSkill from "./UpdateSkill";
import { use } from "react";

type SkillCategoryWithSkills = SkillCategory & { skills: Skill[] };

interface SkillsProps {
  skillCategories: Promise<SkillCategoryWithSkills[]>;
}

const Skills = ({ skillCategories }: SkillsProps) => {
  const skillCategoriesData = use(skillCategories);
  return (
    <Table className="w-full px-6">
      <TableBody>
        {skillCategoriesData.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium px-6">
              <div className="flex flex-col gap-2 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-slate-200 rounded-full p-1 mr-2">
                      {category.icon}
                    </span>
                    <strong>{category.name}</strong>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                      >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <AddSkill skillCategoryID={category.id} />
                      <UpdateCategory skillCategory={category} />
                      <DropdownMenuSeparator />
                      <DeleteCategory skillCategoryID={category.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <small className="text-muted-foreground">
                  {category.description}
                </small>
                <div className="flex flex-wrap gap-1">
                  <p>Skills: </p>
                  {category.skills.map((skill) => (
                    <Badge
                      variant={"default"}
                      key={skill.id}
                      className="bg-green-500 text-white dark:bg-green-600 rounded-full gap-1"
                    >
                      <BadgeCheckIcon className="h-4 w-4" />
                      <UpdateSkill skill={skill} />{" "}
                      <DeleteSkill skillID={skill.id} text="x" />
                    </Badge>
                  ))}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Skills;
