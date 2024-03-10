import { Group, Select } from "@mantine/core";
import { useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const IssueStatusFilter = ({ activePage, setPage }) => {
  const [value, setValue] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const statusChoices = [
    { value: "", label: "All", color: "grey" },
    { value: "OPEN", label: "Open", color: "red" },
    { value: "IN_PROGRESS", label: "In Progress", color: "orange" },
    { value: "CLOSED", label: "Closed", color: "green" },
  ];

  const iconProps = {
    stroke: 1.5,
    color: "currentColor",
    opacity: 0.6,
    size: 10,
  };

  const icons = {
    "": <RiCheckboxBlankCircleFill {...iconProps} color="grey" />,
    OPEN: <RiCheckboxBlankCircleFill {...iconProps} color="red" />,
    IN_PROGRESS: <RiCheckboxBlankCircleFill {...iconProps} color="orange" />,
    CLOSED: <RiCheckboxBlankCircleFill {...iconProps} color="green" />,
  };

  const renderSelectOption = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      {icons[option.value]}
      {option.label}
      {checked && (
        <HiCheckBadge
          style={{ marginInlineStart: "auto", color: value.color }}
          {...iconProps}
        />
      )}
    </Group>
  );

  const handleChange = (_value, option) => {
    setPage(1);
    setValue(option);
    navigate({
      pathname: "",
      search: _value
        ? createSearchParams({
            ...Object.fromEntries([...searchParams]),
            status: _value,
          }).toString()
        : "",
    });
  };

  return (
    <Select
      size="xs"
      placeholder="Please select status"
      data={statusChoices}
      value={value ? value.value : null}
      onChange={handleChange}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      leftSection={<RiCheckboxBlankCircleFill size={10} color={value?.color} />}
      leftSectionPointerEvents="none"
      renderOption={renderSelectOption}
    />
  );
};

export default IssueStatusFilter;
