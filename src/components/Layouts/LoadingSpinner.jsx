import Lottie from "lottie-react";
import dashboardLoad from "../../assets/lotties/dashboard-load.json";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* <div className="animate-spin rounded-full size-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div> */}
          <Lottie
            animationData={dashboardLoad}
            loop={true}
            style={{ width: "350px", height: "350px", margin: "0 auto" }}
          />

          {/* <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="size-6 text-gray-400" />
          </div> */}
        </div>
        <p className="text-gray-600 font-medium">
          Finding amazing opportunities...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
