import { FC } from "react";

import { Grid } from "@mui/material";
import styled from "@emotion/styled";

// Custom Grid styled component with theme for header
const StyledGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "varaint",
})(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 32px",
  ":empty": {
    display: "none",
  },
}));

interface MobileHeaderBlockProps {
  leftSlot?: JSX.Element[];
  rightSlot?: JSX.Element[];
}

export const MobileHeaderBlock: FC<MobileHeaderBlockProps> = ({
  leftSlot,
  rightSlot,
}) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        borderBottom: "1px solid #D7E1E4",
        margin: "0",
        padding: "0 20%",
        "@media (min-width: 769px)": {
          display: "none",
        },
      }}
    >
      <StyledGrid xs item justifyContent="start">
        {leftSlot}
      </StyledGrid>
      <StyledGrid xs item justifyContent="end">
        {rightSlot}
      </StyledGrid>
    </Grid>
  );
};
