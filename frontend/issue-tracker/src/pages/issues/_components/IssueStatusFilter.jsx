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
    { value: "APPROVED", label: "Approved", color: "green" },
    { value: "PENDING_RETEST", label: "Pending Retest", color: "green" },
    { value: "RETESTING", label: "Retesting", color: "green" },
    { value: "RE_OPEN", label: "Re Open", color: "green" },
    { value: "VERIFIED", label: "Verified", color: "green" },
    { value: "REJECTED", label: "Rejected", color: "green" },
    { value: "FIXED", label: "Fixed", color: "green" },
  ];

  const iconProps = {
    stroke: 1.5,
    color: "currentColor",
    opacity: 0.6,
    size: 10,
  };

  const icons = {
    // , rgb(255 237 213), rgb(253 230 138), rgb(233 213 255),
    "": <RiCheckboxBlankCircleFill {...iconProps} color="violet" />,
    OPEN: <RiCheckboxBlankCircleFill {...iconProps} color="rgb(229 231 235)" />,
    IN_PROGRESS: (
      <RiCheckboxBlankCircleFill
        {...iconProps}
        color="oranrgb(254 243 199)ge"
      />
    ),
    CLOSED: <RiCheckboxBlankCircleFill {...iconProps} color="rgb(185 28 28)" />,
    APPROVED: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(96 165 250)" />
    ),
    PENDING_RETEST: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(253 186 116)" />
    ),
    RETESTING: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(253 230 138)" />
    ),
    RE_OPEN: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(156 163 175)" />
    ),
    VERIFIED: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(192 132 252)" />
    ),
    REJECTED: (
      <RiCheckboxBlankCircleFill {...iconProps} color="rgb(248 113 113)" />
    ),
    FIXED: <RiCheckboxBlankCircleFill {...iconProps} color="rgb(16 185 129)" />,
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
      searchable
      size="xs"
      placeholder="Please select status"
      data={statusChoices}
      value={value ? value.value : null}
      onChange={handleChange}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      leftSection={<RiCheckboxBlankCircleFill size={10} color={value?.color} />}
      leftSectionPointerEvents="none"
      renderOption={renderSelectOption}
      nothingFoundMessage="Sorry! Nothing found..."
    />
  );
};

export default IssueStatusFilter;
