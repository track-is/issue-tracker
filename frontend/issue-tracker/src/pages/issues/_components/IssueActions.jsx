import { Button } from "@mantine/core";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const IssueActions = () => {
  return (
    <>
      <div className="mb-2">
        <Button
          color="violet"
          size="xs"
          leftSection={<FaPlusCircle size={14} />}
        >
          <Link className="text-white hover:text-white" to="/issues/new">
            Create New Issue
          </Link>
        </Button>
      </div>
    </>
  );
};

export default IssueActions;
