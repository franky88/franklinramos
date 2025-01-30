"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2 } from "lucide-react";
import UpdateCategory from "./UpdateCategory";

interface CategoryListProps {
  categories: Category[];
  updateCategoryData: () => void;
}

const CategoryList = ({
  categories,
  updateCategoryData,
}: CategoryListProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        Category list
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category list</DialogTitle>
            <DialogDescription>
              List of all projects categories
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <div>{cat.name}</div>
                        <div className="flex items-center gap-2">
                          <UpdateCategory
                            id={cat.id}
                            name={cat.name}
                            updateCategoryList={updateCategoryData}
                          />
                          <Button variant={"link"} size={"sm"}>
                            <Trash2 className="text-red-500 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryList;
