import { FC } from "react";
import { styled } from "@mui/material/styles";

import {
  Container,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const CustomContainer = styled(Container)(() => ({
  padding: "32px 16px !important",
  borderBottom: "1px solid #D7E1E4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  minWidth: "400px",
}));

interface ToDoModalProps {
  open: boolean;
  edit: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const ToDoModal: FC<ToDoModalProps> = ({
  open,
  edit,
  onClose,
  onClick,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Container
        sx={{
          padding: "16px !important",
          borderBottom: "1px solid #D7E1E4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: 20 }} color="primary.main" gutterBottom>
          {edit ? "Edit Task" : "Add Task"}
        </Typography>
      </Container>
      <CustomContainer>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Status"
          >
            <MenuItem value={"New"}>New</MenuItem>
            <MenuItem value={"InProgress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
        <Typography
          variant="body2"
          color="secondary.main"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Priority
          <br />
          <Rating
            icon={<LocalFireDepartmentIcon />}
            emptyIcon={<LocalFireDepartmentIcon />}
          />
        </Typography>
        <Container sx={{ display: "flex", flexDirection: "row", justifyContent: edit ? "space-between" : "center" }}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            {edit ? "Edit" : "Add"}
          </Button>
          {edit && (
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={() => {}}
            >
              Delete
            </Button>
          )}
        </Container>
      </CustomContainer>
    </Dialog>
  );
};
