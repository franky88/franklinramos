"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PortfolioCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import DeleteCategory from "./DeleteCategory";
import AddCategory from "./AddCategory";

interface CategoriesClientProps {
  categories: PortfolioCategory[];
  loading?: boolean;
  fetchCategoriesData?: () => void;
}

const CategoriesClient = ({
  categories,
  fetchCategoriesData,
}: CategoriesClientProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="h-7 rounded-full"
        onClick={() => setOpen(true)}
        variant="outline"
      >
        Category list
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Portfolio category list</DialogTitle>
            <DialogDescription>
              List of available portfolio categories.
            </DialogDescription>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center justify-between">
                    <div>Categories</div>
                    <div>
                      <AddCategory fetchCategoriesData={fetchCategoriesData} />
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      {category.name.toUpperCase()}
                      <div>
                        <DeleteCategory
                          portfolioCategoryId={category.id}
                          fetchCategoriesData={fetchCategoriesData}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoriesClient;
