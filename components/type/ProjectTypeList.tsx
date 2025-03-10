import { useEffect, useState } from "react";
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
import axiosInstance from "@/lib/axiosInstance";
import { useMyToaster } from "@/utils/mytoast";
import { Skeleton } from "../ui/skeleton";
import AddProjectType from "./AddProjectType";

const ProjectTypeList = () => {
  const [projectType, setProjectType] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showToast = useMyToaster();

  const fetchProjectType = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/type");
      const data = response.data;
      setProjectType(data.projectType);
    } catch (error) {
      showToast("Oh no! Something went wrong!", `Error: ${error}`, true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectType();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton className="w-full h-8 rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        File type list
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-4">
                <div>File type list</div>
                <div>
                  <AddProjectType updateTypeList={fetchProjectType} />
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>List of all file types</DialogDescription>
          </DialogHeader>
          <div className="flex gap-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File type name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectType.map((cat) => (
                  <TableRow key={cat._id}>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <div>{cat.name}</div>
                        <div className="flex items-center gap-2">
                          {/* <UpdateCategory
                            category={cat}
                            updateCategoryList={updateCategoryData}
                          />
                          <DeleteCategory
                            categoryId={cat._id}
                            setCategories={updateCategoryData}
                          /> */}
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

export default ProjectTypeList;
