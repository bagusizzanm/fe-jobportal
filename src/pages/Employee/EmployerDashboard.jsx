import { useEffect, useState } from "react";
import {
  Plus,
  BriefcaseBusiness,
  TrendingUp,
  User,
  BadgeCheck,
  FileUser,
  Building2,
  CircleFadingPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import LoadingSpinner from "../../components/Layouts/LoadingSpinner";
import JobCard from "../../components/Cards/JobCard";
import moment from "moment";
import ApplicantCard from "../../components/Cards/ApplicantCard";

const Card = ({ className, children, title, subtitle, headerAction }) => (
  <div className={`bg-white rounded-xl ${className}`}>
    {(title || headerAction) && (
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          {title && (
            <p className="text-lg font-semibold text-gray-900">{title}</p>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {headerAction}
      </div>
    )}
    <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
  </div>
);

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-600 to-blue-400",
    green: "from-emerald-600 to-emerald-400",
    purple: "from-violet-600 to-violet-400",
    orange: "from-orange-600 to-orange-400",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-lg font-semibold">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="">
              <TrendingUp className="size-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <Icon className="size-6" />
        </div>
      </div>
    </Card>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardOverview = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (res.status === 200) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverview();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-full space-y-8 mb-96">
          {/* Dashboard Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <StatCard
              title="Active Job"
              value={dashboardData?.count?.totalActiveJobs}
              icon={BriefcaseBusiness}
              trend={true}
              trendValue={`${dashboardData?.count?.trends?.activeJobs}%`}
              color="blue"
            />
            <StatCard
              title="Applicants"
              value={dashboardData?.count?.totalApplications}
              icon={User}
              trend={true}
              trendValue={`${
                dashboardData?.count?.trends?.totalApplicants || 0
              }%`}
              color="green"
            />
            <StatCard
              title="Hired"
              value={dashboardData?.count?.totalHired || 0}
              icon={BadgeCheck}
              trend={true}
              trendValue={`${dashboardData?.count?.trends?.totalHired || 0}%`}
              color="purple"
            />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card
              title={"Recent Job Posts"}
              subtitle={"Your latest job postings."}
              headerAction={
                <button
                  className="cursor-pointer text-sm font-medium  bg-slate-100 px-3 py-2 rounded-md text-slate-600 hover:text-slate-700 transition-colors duration-300"
                  onClick={() => navigate("/manage-jobs")}
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs
                  ?.slice(0, 3)
                  .map((job, index) => (
                    <JobCard job={job} key={index} />
                  ))}
              </div>
            </Card>
            <Card
              title={"Recent Applications"}
              subtitle={"Latest candidate applications."}
              headerAction={
                <button
                  className="cursor-pointer text-sm font-medium  bg-slate-100 px-3 py-2 rounded-md text-slate-600 hover:text-slate-700 transition-colors duration-300"
                  onClick={() => navigate("/manage-jobs")}
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications
                  ?.slice(0, 3)
                  .map((data, index) => (
                    <ApplicantCard
                      key={index}
                      applicant={data?.applicant || ""}
                      position={data?.job?.title || ""}
                      time={moment(data?.updatedAt).fromNow()}
                    />
                  ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
          >
            <Card
              title={"Quick Actions"}
              subtitle={"Quick actions for your dashboard."}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Post New Job",
                    icon: CircleFadingPlus,
                    color: "bg-blue-50 text-blue-700",
                    path: "/post-job",
                  },
                  {
                    title: "Review Applications",
                    icon: FileUser,
                    color: "bg-green-50 text-green-700",
                    path: "/manage-jobs",
                  },
                  {
                    title: "Company Setting",
                    icon: Building2,
                    color: "bg-orange-50 text-orange-700",
                    path: "/company-profile",
                  },
                ].map((action, index) => (
                  <button key={index} onClick={() => navigate(action.path)}>
                    <div
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${action.color} cursor-pointer`}
                    >
                      <div className={`p-2 rounded-lg bg-white/90`}>
                        <action.icon strokeWidth={1.5} className="size-5" />
                      </div>
                      <span className="text-sm font-medium">
                        {action.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
