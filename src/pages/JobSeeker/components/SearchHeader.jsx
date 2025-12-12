import { MapPin, Search, X } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange }) => {
  return (
    <div className=" bg-white backdrop-blur-2xl border border-slate-100 rounded-2xl p-4 lg:p-8 mb-6 lg:mb-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold lg:text-2xl text-slate-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-slate-600 text-sm lg:text-base">
            Discover your next opportunity, and matching it!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-3 text-slate-500 z-[1]" />
            <input
              type="text"
              placeholder="Title, company, other keywords"
              className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg outline-0 text-sm bg-white/50 backdrop-blur-xl"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 size-3 text-slate-500 cursor-pointer"
              onClick={() => handleFilterChange("keyword", "")}
            >
              <X className="size-3 text-slate-500" />
            </button>
          </div>
          <div className="relative min-w-0 lg:min-w-[200px]">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2  z-[1] size-3 text-slate-500" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg outline-0 text-sm bg-white/50 backdrop-blur-xl"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 size-3 text-slate-500 cursor-pointer"
              onClick={() => handleFilterChange("location", "")}
            >
              <X className="size-3 text-slate-500" />
            </button>
          </div>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
