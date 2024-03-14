import { Button } from "@mantine/core";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const IssueActions = ({ rows }) => {
  return (
    <>
      <div className="flex gap-2 mb-2">
        {rows?.length > 0 && <Button color="red" size="xs" leftSection={<FaMinusCircle size={14} />}>
          <Link className="text-white hover:text-white" to="/issues/new">
            Delete Issues
          </Link>
        </Button>}
        <Button color="blue" size="xs" leftSection={<FaPlusCircle size={14} />}>
          <Link className="text-white hover:text-white" to="/issues/new">
            Create New Issue
          </Link>
        </Button>
      </div>
    </>
  );
};

export default IssueActions;
