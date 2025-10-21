"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, XAxis, CartesianGrid, AreaChart, Area } from "recharts";

type Props = {
  data: { date: string; visits: number }[];
};

const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--chart-1))",
  },
};

const VisitorChart = ({ data }: Props) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full border mt-2"
    >
      <AreaChart
        width={600} // fixed width
        height={400} // fixed height
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickMargin={8} minTickGap={32} />
        {/* <YAxis /> */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          type="monotone"
          dataKey="visits"
          stroke="var(--color-visits)"
          strokeWidth={2}
          dot={false}
        />
        <Area
          dataKey="visits"
          type="monotone"
          fill="var(--color-visits)"
          fillOpacity={0.3}
          stroke="none"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default VisitorChart;
