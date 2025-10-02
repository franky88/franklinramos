"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

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
  const dataSample = [
    { date: "2025-09-25", visits: 10 },
    { date: "2025-09-26", visits: 15 },
    { date: "2025-09-27", visits: 7 },
    { date: "2025-09-28", visits: 20 },
  ];
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
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
