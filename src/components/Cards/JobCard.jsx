import { BriefcaseIcon } from "lucide-react";
import moment from "moment";

const JobCard = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <div className="size-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <BriefcaseIcon strokeWidth={1.5} className="size-5 text-blue-600" />
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-900">{job.title}</h4>
          <p className="text-xs text-gray-500">
            {job.location} • {moment(job.createdAt)?.format("DD-MM-YYYY")}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            !job.isClosed
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {!job.isClosed ? "Active" : "Closed"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
