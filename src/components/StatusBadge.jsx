const StatusBadge = ({ status }) => {
  const statusConfig = {
    Applied: "bg-amber-100 text-amber-700",
    Underreview: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
