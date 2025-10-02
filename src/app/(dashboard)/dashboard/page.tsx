import React from "react";
import Skills from "@/components/skills/Skills";
import { fetchSkillCategories } from "@/lib/dataFetch";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import AddCategory from "@/components/skills/category/AddCategory";
import VisitorChart from "@/components/VisitorChart";
import { getVisitsByDate } from "@/lib/analytics";
import PortfoliosList from "@/components/portfolio/PortfolioList";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { fetchPortfolio } from "@/lib/dataFetch";

const Dashboard = async () => {
  const skillCategories = fetchSkillCategories();

  const skills = skillCategories.then((categories) =>
    categories.reduce((acc, category) => acc + category.skills.length, 0)
  );

  const visits = await getVisitsByDate();

  const portfolios = await fetchPortfolio();
  const portfolioCount = portfolios.total || 0;

  return (
    <div className="flex flex-1 flex-col gap-8 p-2 pt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <PortfolioCard count={portfolioCount} />

        <div className="bg-muted/10 border p-4 rounded-xl">
          <div>
            <small className="text-muted-foreground">Skill details</small>
            <h3 className="font-bold text-4xl">
              {skills.then((count) => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">{count} skills</div>
                  <div>
                    <Badge variant="secondary" className="ml-2">
                      {count >= 10 ? (
                        <span className="flex items-center gap-1">
                          <IconTrendingUp className="h-4 w-4 text-green-500" />
                          {((count - 10) / 10) * 100}%
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <IconTrendingDown className="h-4 w-4 text-red-500" />
                          {((10 - count) / 10) * 100}%
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </h3>
          </div>
        </div>
        <div className="bg-muted/10 border p-4 rounded-xl">
          <div>
            <small>Post details</small>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">Site Visitor Monitor</h3>
            <p>Real-time visitor tracking and monitoring.</p>
          </div>
        </div>
        <div className="bg-muted/50 border flex-1 rounded-xl md:min-h-min p-4">
          {/* <VisitorsList /> */}
          <VisitorChart data={visits} />
        </div>
      </div>

      <PortfoliosList />

      <div>
        <div className="mb-4">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="font-bold text-2xl">Skills</h3>
              <p className="text-muted-foreground">
                Manage your skills and proficiency levels.
              </p>
            </div>

            <div>
              <AddCategory />
            </div>
          </div>
        </div>
        <div className="bg-muted/50 border flex-1 rounded-xl md:min-h-min">
          <Skills skillCategories={skillCategories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
