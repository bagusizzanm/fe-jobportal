const SkeletonCard = () => {
  return (
    <div className="w-full border border-slate-200 rounded-2xl p-5 bg-white shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </div>

      {/* Description */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Footer CTA */}
      <div className="flex justify-between items-center mt-5">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-8 bg-gray-300 rounded-lg w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
