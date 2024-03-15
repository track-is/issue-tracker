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
import IssuesPageLoading from "./_components/IssuesPageLoading";
import delay from "delay";

const IssuesPage = () => {
  const [activePage, setPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: res,
    error,
    isFetching,
    isSuccess,
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
            orderBy: "id",
          }).toString()
        : "",
    });
  }, [activePage, navigate, searchParams]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  // if (isFetching) return <IssuesPageLoading />;
  return (
    <div>
      <h3 className="mb-3">Current Issues</h3>
      <div className="flex justify-between ">
        {res?.items && (
          <IssueStatusFilter activePage={activePage} setPage={setPage} />
        )}
        <IssueActions rows={selectedRows} />
      </div>
      {res?.items ? (
        <IssuesTable
          issues={res?.items}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      ) : (
        <IssuesPageLoading />
      )}
      <div className="mt-4 flex flex-col items-center">
        {res?.items && (
          <>
            <Pagination
              className="mt-2"
              page={activePage}
              onChange={setPage}
              total={res?.pages}
              color="blue"
              radius="lg"
              boundaries={10}
              size="sm"
            />
            <span className="mt-4 py-1 px-4 text-sm font-bold bg-zinc-200 rounded-md text-center">
              Results: {res?.items?.length} / {res?.total}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
