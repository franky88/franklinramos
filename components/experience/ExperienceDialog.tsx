import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";

interface ExperienceDialogProps {
  experience: Experience;
}

const ExperienceDialog = ({ experience }: ExperienceDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-start">
        <strong className="text-xl text-blue-900 text-left">
          {experience.position}
        </strong>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <strong className="text-xl">{experience.position}</strong>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <strong>Tasks and Responsibilities: </strong>
            {experience.description?.split(",").map((s, index) => (
              <span className="flex flex-col" key={index}>
                <i className="flex items-start gap-3">
                  <CircleCheck className="w-4 text-green-900" />
                  {s}
                </i>
              </span>
            ))}
          </div>
          {/* <div>
            <ExperienceChart fromDate={startDate} toDate={endDate} />
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
