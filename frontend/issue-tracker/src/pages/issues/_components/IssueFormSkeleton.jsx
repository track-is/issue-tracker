import { Box } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-2xl">
      <Skeleton height="2rem" width="15rem" />
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Skeleton height="2rem" width="8rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
