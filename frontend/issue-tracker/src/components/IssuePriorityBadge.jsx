import { ColorSwatch } from "@mantine/core";

const IssuePriorityBadge = ({ priority }) => {
  const map = {
    LOW: {
      label: "Low",
      color: "skyblue",
    },
    MEDIUM: {
      label: "Medium",
      color: "orange",
    },
    HIGH: {
      label: "High",
      color: "red",
    },
  };

  return <ColorSwatch color={map[priority]?.color} />;
};

export default IssuePriorityBadge;
