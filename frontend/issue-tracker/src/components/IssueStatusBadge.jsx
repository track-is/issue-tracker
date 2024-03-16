const IssueStatusBadge = ({ status }) => {
  const map = {
    OPEN: {
      label: "Open",
      color: "red",
      bgColor: "bg-gray-100",
      textColor: "text-gray-600",
    },
    CLOSED: {
      label: "Closed",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "orange",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    APPROVED: {
      label: "Approved",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-blue-100	",
      textColor: "text-blue-800",
    },
    PENDING_RETEST: {
      label: "Pending Retest",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    RETESTING: {
      label: "Retesting",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-amber-200	",
      textColor: "text-amber-700",
    },
    RE_OPEN: {
      label: "Re Open",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-gray-300",
      textColor: "text-gray-700",
    },
    VERIFIED: {
      label: "Verified",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-purple-200	",
      textColor: "text-purple-600",
    },
    REJECTED: {
      label: "Rejected",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    FIXED: {
      label: "Fixed",
      color: "rgba(22, 171, 133, 1)",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
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
