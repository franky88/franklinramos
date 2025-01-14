import { Dot, CircleDot, CircleChevronUp } from "lucide-react";

interface ExperienceListProps {
  id?: string;
  companyName: string;
  dateStart: string;
  dateEnd: string;
  position: string;
  withLine?: boolean;
}

const ExperienceList = ({
  companyName,
  position,
  dateStart,
  dateEnd,
  withLine,
}: ExperienceListProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-start">
        <div className="text-blue-900">
          {withLine ? (
            <CircleChevronUp className="w-4" />
          ) : (
            <CircleDot className="w-4" />
          )}
          {withLine ? <div className="vertical-line"></div> : false}
        </div>
        <div className="flex flex-col">
          <strong className="text-xl">{position.toUpperCase()}</strong>
          <strong>{companyName}</strong>
          <small>
            From {dateStart} to {dateEnd}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
