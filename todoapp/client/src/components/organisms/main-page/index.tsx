import { FC, useState, ChangeEvent, useEffect } from "react";
import { debounce } from "lodash";

import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";

import { HeaderBlock, Sticky, ToDoModal } from "../../molecules";
import { MobileButton } from "../../atoms";

// Custom container styled component with theme for grid container
const CustomGrid = styled(Grid)(() => ({
  backgroundColor: "#F2F7F7",
  padding: "32px",
  minHeight: "100vh",
  flexDirection: "row",
  gap: "32px",
  alignContent: "flex-start",
  "@media (max-width: 768px)": {
    justifyContent: "center",
  },
}));

interface MainPageProps {
  toDoList: Todo[];
}

export const MainPage: FC<MainPageProps> = ({ toDoList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleSearch = debounce(() => {
    const filtered = toDoList.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedStatus === "All" || todo.status === selectedStatus)
    );
    setFilteredTodos(filtered);
  }, 100); // Debounce delay of 100 milliseconds

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  }; // function to handle search input change

  const handleStatusChange = (e: any) => {
    const category = e.target.value;
    setSelectedStatus(category);
    handleSearch();
  }; // function to handle status change

  const handleModalOpen = (edit: boolean) => {
    setIsOpen(!isOpen);
    setIsEdit(edit);
  }; // function to handle modal open/close

  useEffect(() => {
    handleSearch();
  }, [searchText, selectedStatus]); // Run on selectedStatus and searchText change to filter todos

  return (
    <>
      <HeaderBlock
        leftSlot={[
          <Button
            key={"Add Button"}
            variant="contained"
            color="primary"
            onClick={() => handleModalOpen(false)}
            endIcon={<AddIcon />}
          >
            Add Task
          </Button>,
        ]}
        centerSlot={[
          <TextField
            key={"Search Input"}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />,
        ]}
        rightSlot={[
          <FormControl sx={{ width: "200px" }} key={"Status Select"}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              label="Status"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"New"}>New</MenuItem>
              <MenuItem value={"InProgress"}>In Progress</MenuItem>
              <MenuItem value={"Done"}>Done</MenuItem>
            </Select>
          </FormControl>,
        ]}
      />
      <CustomGrid container>
        {filteredTodos.length > 0
          ? filteredTodos.map((item) => (
              <Sticky item={item} onClick={handleModalOpen} key={item.id} />
            ))
          : null}
      </CustomGrid>
      <MobileButton onClick={() => handleModalOpen(true)} />
      <ToDoModal
        open={isOpen}
        onClick={() => {}}
        onClose={() => handleModalOpen(false)}
        edit={isEdit}
      />
    </>
  );
};
