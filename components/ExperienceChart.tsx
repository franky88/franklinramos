"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const chartData = [
  { skills: "graphic", yearsOfExperience: 16, fill: "var(--color-graphic)" },
  {
    skills: "animation",
    yearsOfExperience: 15,
    fill: "var(--color-animation)",
  },
  {
    skills: "illustration",
    yearsOfExperience: 7,
    fill: "var(--color-illustration)",
  },
  { skills: "coding", yearsOfExperience: 8, fill: "var(--color-coding)" },
  { skills: "other", yearsOfExperience: 16, fill: "var(--color-other)" },
];

const chartConfig = {
  yearsOfExperience: {
    label: "Years of Experience",
  },
  graphic: {
    label: "Graphic",
    color: "hsl(var(--chart-1))",
  },
  animation: {
    label: "Animation",
    color: "hsl(var(--chart-2))",
  },
  illustration: {
    label: "Illustration",
    color: "hsl(var(--chart-3))",
  },
  coding: {
    label: "Coding",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ExperienceChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.yearsOfExperience, 0);
  }, []);
  return (
    <Card className="flex flex-col shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Skills Experience</CardTitle>
        <CardDescription>From 2009 to 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="yearsOfExperience"
              nameKey="skills"
              innerRadius={40}
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
