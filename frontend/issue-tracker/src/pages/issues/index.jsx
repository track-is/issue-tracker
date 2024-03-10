// import LoadingIssuesPage from "./loading";
import IssueActions from "./_components/IssueActions";
import IssuesTable from "./_components/IssuesTable";
import { useFetchIssuesList } from "../../api/hooks/useIssue";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Pagination } from "@mantine/core";

const IssuesPage = () => {
  const [activePage, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    data: res,
    error,
    isFetching,
    refetch,
  } = useFetchIssuesList(searchParams);

  //   if (isFetching) return <LoadingIssuesPage />;

  useEffect(() => {
    navigate({
      pathname: "",
      search: activePage
        ? createSearchParams({
            ...Object.fromEntries([...searchParams]),
            pageNo: activePage,
          }).toString()
        : "",
    });
  }, [activePage, navigate, searchParams]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);
  return (
    <div>
      <h3 className="mb-3">Current Issues</h3>
      <div className="flex justify-between ">
        {res?.items && (
          <IssueStatusFilter activePage={activePage} setPage={setPage} />
        )}
        <IssueActions />
      </div>
      {res?.items && <IssuesTable issues={res?.items} />}
      <div className="flex justify-center">
        {res?.items && (
          <Pagination
            className="mt-4"
            page={activePage}
            onChange={setPage}
            total={res?.pages}
            color="violet"
            radius="lg"
            boundaries={10}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
