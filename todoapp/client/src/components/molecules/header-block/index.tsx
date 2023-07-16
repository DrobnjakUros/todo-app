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

interface HeaderBlockProps {
  leftSlot?: JSX.Element[];
  centerSlot?: JSX.Element[];
  rightSlot?: JSX.Element[];
}

export const HeaderBlock: FC<HeaderBlockProps> = ({
  leftSlot,
  centerSlot,
  rightSlot,
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderBottom: "1px solid #D7E1E4",
        margin: "0",
        "@media (max-width: 768px)": {
          display: "none",
        },
      }}
    >
      <StyledGrid sm justifyContent="start">
        {leftSlot}
      </StyledGrid>
      <StyledGrid sm justifyContent="center">
        {centerSlot}
      </StyledGrid>
      <StyledGrid sm justifyContent="end">
        {rightSlot}
      </StyledGrid>
    </Grid>
  );
};
