import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PortfolioCategory } from "@prisma/client";
import { Button } from "../ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { Portfolio } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import DeletePortfolio from "./DeletePortfolio";
import { Badge } from "../ui/badge";
import UpdatePortfolio from "./UpdatePortfolio";
import images from "@/constants/images";
import { User } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

type PortfolioWithRelations = Portfolio & {
  portfolioCategory: PortfolioCategory | null;
  user: User | null;
};

interface PortfoliosProps {
  portfolios: PortfolioWithRelations[];
  loading?: boolean;
  fetchPortfoliosData: () => void;
}

const Portfolios = ({
  portfolios,
  loading,
  fetchPortfoliosData,
}: PortfoliosProps) => {
  return (
    <Table className="w-full px-6">
      <TableBody>
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: 4 }).map((_, cellIdx) => (
                  <TableCell key={cellIdx} className="h-24">
                    <Skeleton className="h-7 w-full rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
        ) : (
          portfolios.map((portfolio) => (
            <TableRow
              key={portfolio.id}
              className={`${
                portfolio.isHidden ? "opacity-50" : ""
              } hover:bg-muted`}
            >
              <TableCell className="font-medium px-6">
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Image
                        src={
                          portfolio.imageUrl
                            ? portfolio.imageUrl
                            : images.imageHolder
                        }
                        width={50}
                        height={50}
                        alt={portfolio.id}
                        content="cover"
                        className="bg-slate-200 rounded-full p-1 mr-2 "
                      />
                      <div className="flex flex-col items-start">
                        <strong>
                          <Link
                            href={
                              portfolio.projectUrl ? portfolio.projectUrl : "#"
                            }
                            className="hover:text-blue-500"
                          >
                            {portfolio.title}
                          </Link>
                        </strong>
                        <small className="text-muted-foreground">
                          {portfolio.description}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="default" className="ml-1 rounded-full px-2">
                  {portfolio.portfolioCategory?.name
                    ? portfolio.portfolioCategory.name
                    : "Uncategorized"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-full px-2">
                  <small className="text-muted-foreground mr-1">
                    Created by:{" "}
                  </small>{" "}
                  {portfolio.user?.name ?? "Unknown user"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                {portfolio.isHidden ? (
                  <Badge variant="outline" className="rounded-full px-2">
                    Unpublished
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="rounded-full px-2 border-green-500 text-green-500"
                  >
                    Published
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
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
                      <UpdatePortfolio
                        portfolioId={portfolio.id}
                        fetchPortfoliosData={fetchPortfoliosData}
                      />
                      <DropdownMenuSeparator />
                      <DeletePortfolio
                        portfolioID={portfolio.id}
                        fetchPortfoliosData={fetchPortfoliosData}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default Portfolios;
