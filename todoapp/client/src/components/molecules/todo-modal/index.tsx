import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import axios from "axios";

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
  handleModalOpen: (open: boolean) => void;
}

export const ToDoModal: FC<ToDoModalProps> = ({
  open,
  edit,
  handleModalOpen,
}) => {
  const { register, handleSubmit, control, reset } = useForm<Todo>();

  const handleAddToDo = (data: Todo) => {
    axios
      .post("http://localhost:5050/todo", data)
      .then(function () {
        // handle success
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit: SubmitHandler<Todo> = (data: Todo) => {
    edit ? handleAddToDo(data) : null;
    onClose();
  };

  const onClose = () => {
    handleModalOpen(false);
    reset({
      title: "",
      status: "New",
      priority: 0,
    });
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomContainer>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
            required
            {...register("title", { required: true })}
          />
          <FormControl fullWidth>
            <InputLabel id="status-select-label" required>
              Status
            </InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="status-select-label"
                  id="status-select"
                  label="Status"
                  required
                >
                  <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"InProgress"}>In Progress</MenuItem>
                  <MenuItem value={"Done"}>Done</MenuItem>
                </Select>
              )}
              name={"status"}
              control={control}
              defaultValue={"New"}
            />
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
            <Controller
              name="priority"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Rating
                  name="priority"
                  onChange={onChange}
                  value={Number(value)}
                  icon={<LocalFireDepartmentIcon />}
                  emptyIcon={<LocalFireDepartmentIcon />}
                />
              )}
            />
          </Typography>

          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: edit ? "space-between" : "center",
            }}
          >
            <Button
              size="medium"
              variant="contained"
              color="primary"
              type="submit"
            >
              {edit ? "Edit" : "Add"}
            </Button>
            {edit && (
              <Button size="medium" variant="outlined" color="primary">
                Delete
              </Button>
            )}
          </Container>
        </CustomContainer>
      </form>
    </Dialog>
  );
};
