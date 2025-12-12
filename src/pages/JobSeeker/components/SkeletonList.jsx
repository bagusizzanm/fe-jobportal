import SkeletonCard from "./SkeletonCard";

const SkeletonList = ({ viewMode }) => {
  const count = viewMode === "grid" ? 6 : 4; // lebih banyak untuk grid

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
          : "space-y-4 lg:space-y-6"
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonList;
