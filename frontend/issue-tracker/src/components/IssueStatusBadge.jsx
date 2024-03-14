
const IssueStatusBadge = ({ status}) => {
  const map = {
    OPEN: {
      label: "Open",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    CLOSED: {
      label: "Closed",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "orange",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
  };
  const spanClass =
    "px-3 py-1 rounded-md font-bold" +
    " " +
    map[status]?.textColor +
    " " +
    map[status]?.bgColor;

  return (
    // <Badge color={map[status]?.color} size="lg">
    //   <span className={`${classValue} `}>{map[status]?.label}</span>
    // </Badge>
    <span className={spanClass}>{map[status]?.label}</span>
  );
};

export default IssueStatusBadge;
