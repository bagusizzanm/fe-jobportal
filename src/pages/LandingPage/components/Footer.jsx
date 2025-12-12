import { Briefcase } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="realtive bg-slate-50 text-slate-900 overflow-hidden">
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center space-y-8">
            {/* Logo Brand */}
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="size-10 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="size-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Job Portal
                </h3>
              </div>

              <p className={`text-sm text-slate-600 max-w-md mx-auto`}>
                {" "}
                Connecting talented professionals with innovative companies
                worldwide. Your career success is our mission.{" "}
              </p>
            </div>

            {/* Copyright */}
            <div className="space-y-2">
              <p className="text-sm text-slate-600 ">
                © {new Date().getFullYear()} Bagus Izzan. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
