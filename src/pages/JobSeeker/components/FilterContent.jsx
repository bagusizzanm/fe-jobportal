import { ChevronDown, ChevronUp } from "lucide-react";
import SalarySlider from "../../../components/Input/SalarySlider";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import { AnimatePresence, motion } from "framer-motion";

const FilterSection = ({ title, children, isExpanded, onToggle }) => (
  <div className="border-b border-slate-200 pb-4 mb-4 last:border-b-0">
    <button
      className="flex items-center justify-between w-full text-left font-semibold text-slate-900 mb-3 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
      onClick={onToggle}
    >
      {title}
      {isExpanded ? (
        <ChevronUp className="size-4" />
      ) : (
        <ChevronDown className="size-4" />
      )}
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <button
          className="text-sm font-semibold text-blue-600 mb-3 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>

      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded-sm border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
                checked={filters.jobType === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "jobType",
                    e.target.checked ? type.value : ""
                  )
                }
              />
              <span className="ml-3 text-slate-600 font-medium">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalarySlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>
      <FilterSection
        title="Category"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <label
              key={category.value}
              className="flex items-center cursor-pointer "
            >
              <input
                type="checkbox"
                className="rounded-sm border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
                checked={filters.category === category.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? category.value : ""
                  )
                }
              />
              <span className="ml-3 text-slate-600 font-medium">
                {category.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;
