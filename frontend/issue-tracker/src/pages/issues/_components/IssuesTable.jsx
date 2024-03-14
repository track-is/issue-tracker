import { Checkbox, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import IssueStatusBadge from "../../../components/IssueStatusBadge";

const IssuesTable = ({ issues, selectedRows, setSelectedRows }) => {
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
    <Table.Tr
      key={idx}
      bg={
        selectedRows.includes(item.issueCode)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(item.issueCode)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, item.issueCode]
                : selectedRows.filter((position) => position !== item.issueCode)
            )
          }
        />
      </Table.Td>
      {/* <Table.Td>{(+searchParams.get("pageNo") - 1) * 10 + idx + 1}</Table.Td> */}
      <Table.Td>{item.issueCode}</Table.Td>
      <Table.Td>
        <Link to={`/issues/${item.id}`} className="mb-2 md:mb-0 text-black">
          {item.title}
        </Link>
      </Table.Td>
      <Table.Td>
        <IssueStatusBadge status={item.status} />
      </Table.Td>

      <Table.Td>
        {new Date(item.createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          // weekday: "long",
          // hour: "2-digit",
          // hour12: true,
          // minute: "2-digit",
          // second: "2-digit",
        })}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>ID</Table.Th>
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
      <Table
        highlightOnHover
        stickyHeader
        stickyHeaderOffset={0}
        className="mt-4"
      >
        <Table.Thead className="bg-gray-100 text-gray-700 rounded-md">
          {ths}
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default IssuesTable;
