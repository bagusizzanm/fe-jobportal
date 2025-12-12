import { Clock } from "lucide-react";
import moment from "moment";

const ApplicantCard = ({ applicant, position, time }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <div className="size-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="space-y-2">
          <h4 className="text-md font-medium text-gray-900">
            {applicant.name}
          </h4>
          <p className="text-xs text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-gray-500">
          <Clock strokeWidth={1.5} className="mr-1 size-3 text-gray-600" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
