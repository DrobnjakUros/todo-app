import { FC } from "react";

import { styled } from "@mui/material/styles";
import { Container, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

// Custom container styled component with theme for mobile button
const CustomContainer = styled(Container)(() => ({
  padding: "0px !important",
  width: "100%",
  position: "fixed",
  bottom: 0,
  left: 0,
  "@media (min-width: 769px)": {
    display: "none",
  },
}));

interface MobileButtonProps {
  onClick?: () => void;
}

export const MobileButton: FC<MobileButtonProps> = ({ onClick }) => {
  return (
    <CustomContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        endIcon={<AddIcon />}
        sx={{ width: "100%", height: "56px", borderRadius: "0px" }}
      >
        Add Task
      </Button>
    </CustomContainer>
  );
};
