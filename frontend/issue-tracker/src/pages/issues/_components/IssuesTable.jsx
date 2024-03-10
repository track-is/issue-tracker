import { Table } from "@mantine/core";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import IssueStatusBadge from "../../../components/IssueStatusBadge";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const IssuesTable = ({ issues }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [colName, setColName] = useState("id");
  const [isColClicked, setColCLicked] = useState(false);
  const columns = [
    {
      label: "Title",
      value: "title",
    },
    { label: "Status", value: "status" },
    { label: "Created At", value: "createdAt", classValue: "text-center" },
  ];

  const rows = issues?.map((item, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{(+searchParams.get("pageNo") - 1) * 10 + idx + 1}</Table.Td>
      <Table.Td>
        <Link to={`/issues/${item.id}`} className="mb-2 md:mb-0 text-black">
          {item.title}
        </Link>
      </Table.Td>
      <Table.Td>
        <IssueStatusBadge status={item.status} classValue="text-normal" />
      </Table.Td>
      <Table.Td>
        {new Date(item.createdAt).toLocaleString(undefined, {
          year: "2-digit",
          month: "short",
          day: "2-digit",
          weekday: "long",
          hour: "2-digit",
          hour12: true,
          minute: "2-digit",
          second: "2-digit",
        })}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>#</Table.Th>
      {columns.map((col) => (
        <Table.Th
          key={col.label}
          onClick={() => {
            setColName(col.value);
            setColCLicked(!isColClicked);
          }}
          className={`${col.classValue} cursor-pointer hover:underline`}
        >
          <div className="flex items-center gap-1">
            {col.label}
            {isColClicked && colName == col.value ? (
              <FaArrowUp size={12} />
            ) : null}
          </div>
        </Table.Th>
      ))}
      {/* <Table.Th>Title</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th className="text-center">Created At</Table.Th> */}
    </Table.Tr>
  );

  useEffect(() => {
    navigate({
      pathname: "",
      search: colName
        ? createSearchParams({
            ...Object.fromEntries([...searchParams]),
            orderBy: isColClicked ? colName : "id",
          }).toString()
        : "",
    });
  }, [isColClicked, colName, navigate, searchParams]);
  return (
    <>
      <Table highlightOnHover stickyHeader stickyHeaderOffset={0}>
        <Table.Thead className="bg-gray-400 text-white">{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default IssuesTable;
