import { Badge } from "@mantine/core";

const IssueStatusBadge = ({ status, classValue = "text-normal" }) => {
  const map = {
    OPEN: {
      label: "Open",
      color: "red",
    },
    CLOSED: {
      label: "Closed",
      color: "rgba(22, 171, 133, 1)",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "orange",
    },
  };

  return (
    <Badge color={map[status]?.color} size="lg">
      <span className={`${classValue} `}>{map[status]?.label}</span>
    </Badge>
  );
};

export default IssueStatusBadge;
