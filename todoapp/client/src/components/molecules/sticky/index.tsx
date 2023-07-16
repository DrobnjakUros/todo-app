import { FC } from "react";
import { styled } from "@mui/material/styles";

import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Rating,
  Button,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

// Custom Card styled component with theme for Todo item
const CustomCard = styled(Card)(() => ({
  minWidth: 275,
  backgroundColor: "#FBF5EC",
  height: "fit-content",
}));

interface StickyProps {
  item: Todo;
}

export const Sticky: FC<StickyProps> = ({ item }) => {
  return (
    <CustomCard>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="primary.main" gutterBottom>
          {item.title}
        </Typography>
        <Typography sx={{ mb: 3 }} color="secondary.main">
          {item.status}
        </Typography>
        <Typography variant="body2" color="secondary.main">
          Priority:
          <br />
          <Rating
            icon={<LocalFireDepartmentIcon />}
            emptyIcon={<LocalFireDepartmentIcon />}
            value={item.priority}
          />
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small">Edit</Button>
      </CardActions>
    </CustomCard>
  );
};
