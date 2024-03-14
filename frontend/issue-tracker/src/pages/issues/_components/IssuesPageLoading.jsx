import { Skeleton, Table } from "@mantine/core";

const IssuesPageLoading = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <Skeleton animate height={30} width={200} />
      <Skeleton className="mt-2" animate height={60} />
      <div className="mt-4">
        {issues.map((_, i) => (
          <Skeleton key={i} className="mt-2" animate height={30} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Skeleton animate height={30} width={300} />
      </div>
    </>
  );
};

export default IssuesPageLoading;
