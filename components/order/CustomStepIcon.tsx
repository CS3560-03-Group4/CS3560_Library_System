import React from "react";
import { styled } from "@mui/material/styles";

const CustomStepIconRoot = styled("div")<{ ownerState: { active: boolean } }>(
  ({ theme, ownerState }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30, // Adjust size
    height: 30,
    borderRadius: "50%",
    backgroundColor: ownerState.active ? "#00843D" : "#ddd", // Active step color
    color: ownerState.active ? "#fff" : "#000", // Text color
    fontWeight: ownerState.active ? "bold" : "normal", // Bold text for active
  })
);

const CustomStepIcon: React.FC<{
  active?: boolean; // Allow active to be undefined
  completed?: boolean; // Allow completed to be undefined
  className?: string;
  icon: React.ReactNode;
}> = ({ active = false, icon }) => {
  return (
    <CustomStepIconRoot ownerState={{ active }}>{icon}</CustomStepIconRoot>
  );
};

export default CustomStepIcon;
