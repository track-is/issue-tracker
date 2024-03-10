import { Avatar, Text, UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import { IoIosArrowForward } from "react-icons/io";

const ProfileButton = forwardRef(({ image, name, icon, ...others }, ref) => (
  <UnstyledButton
    ref={ref}
    style={{
      color: "var(--mantine-color-text)",
      borderRadius: "var(--mantine-radius-sm)",
    }}
    {...others}
  >
    <div className="flex items-center gap-1">
      <Avatar src={image} size="sm" radius="xl" />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {name}
        </Text>
      </div>

      {icon || <IoIosArrowForward size={10} />}
    </div>
  </UnstyledButton>
));

ProfileButton.displayName = "ProfileButton";

export default ProfileButton;
