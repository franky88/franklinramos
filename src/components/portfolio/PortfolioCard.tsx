import React from "react";
import { Badge } from "../ui/badge";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

interface PortfolioCardProps {
  count: number;
}

const PortfolioCard = ({ count }: PortfolioCardProps) => {
  return (
    <div className="bg-muted/10 rounded-xl border p-4">
      <div className="flex flex-col gap-2">
        <small className="text-muted-foreground">Portfolio details</small>
        <h3 className="font-bold text-4xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">{count} portfolios</div>
            <div>
              <Badge variant="secondary" className="ml-2">
                {count >= 5 ? (
                  <span className="flex items-center gap-1">
                    <IconTrendingUp className="h-4 w-4 text-green-500" />
                    {((count - 5) / 5) * 100}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <IconTrendingDown className="h-4 w-4 text-red-500" />
                    {((5 - count) / 5) * 100}%
                  </span>
                )}
              </Badge>
            </div>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default PortfolioCard;
