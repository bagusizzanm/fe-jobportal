import { useState } from "react";

const SalarySlider = ({ filters, handleFilterChange }) => {
  const [salaryMin, setSalaryMin] = useState(filters?.salaryMin || 0);
  const [salaryMax, setSalaryMax] = useState(filters?.salaryMax || 0);

  const commitMin = () => {
    const newValue = salaryMin ? parseInt(salaryMin) : "";
    if (newValue !== filters.salaryMin) {
      handleFilterChange("salaryMin", newValue);
    }
  };

  const commitMax = () => {
    const newValue = salaryMax ? parseInt(salaryMax) : "";
    if (newValue !== filters.salaryMax) {
      handleFilterChange("salaryMax", newValue);
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Min Salary
          </label>
          <input
            type="number"
            placeholder="0"
            min={0}
            step={1000}
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-blur-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={salaryMin || ""}
            onChange={({ target }) => setSalaryMin(target.value)}
            onBlur={commitMin}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Max Salary
          </label>
          <input
            type="number"
            placeholder="No Limit"
            min={0}
            step={1000}
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-blur-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={salaryMax || ""}
            onChange={({ target }) => setSalaryMax(target.value)}
            onBlur={commitMax}
          />
        </div>
      </div>

      {/* Display current range */}
      {salaryMin || salaryMax ? (
        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md">
          Range: {salaryMin ? `$${salaryMin.toLocaleString()}` : "$0"} -{" "}
          {salaryMax ? `$${salaryMax.toLocaleString()}` : "No Limit"}
        </div>
      ) : null}
    </div>
  );
};

export default SalarySlider;
