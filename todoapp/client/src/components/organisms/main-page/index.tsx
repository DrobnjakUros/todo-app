import { FC, useState, ChangeEvent, useMemo } from "react";
import { debounce } from "lodash";

import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  HeaderBlock,
  MobileHeaderBlock,
  Sticky,
  ToDoModal,
} from "../../molecules";
import { MobileButton } from "../../atoms";
import { useGetAllTodosQuery } from "../../../store/todoSlice";

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

const PAGE_SIZE = 10;

export const MainPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null); // active todo for edit
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useGetAllTodosQuery(); // fetch data from server

  const filteredData = useMemo(() => {
    return data?.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedStatus === "All" || todo.status === selectedStatus)
    );
  }, [data, searchText, selectedStatus]); // memoized filtered data

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  }, 100); // function to handle search input change with debounce

  const handleStatusChange = (e: any) => {
    const category = e.target.value;
    setSelectedStatus(category);
  }; // function to handle status change

  const handleModalOpen = (edit: boolean, todo: Todo | null) => {
    setIsOpen(!isOpen);
    setIsEdit(edit);
    setActiveTodo(todo);
  }; // function to handle modal open/close

  // Pagination logic
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const totalTodos = filteredData?.length ?? 0;
  const totalPages = Math.ceil(totalTodos / PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedData = useMemo(() => {
    return filteredData?.slice(startIndex, endIndex);
  }, [data, searchText, selectedStatus, currentPage]); // memoized filtered data

  return (
    <>
      <HeaderBlock
        leftSlot={[
          <Button
            key={"Add Button"}
            variant="contained"
            color="primary"
            onClick={() => handleModalOpen(false, null)}
            endIcon={<AddIcon />}
          >
            Add Task
          </Button>,
        ]}
        centerSlot={[
          <IconButton
            key={"Previous Page"}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowBackIosIcon />
          </IconButton>,
          <TextField
            key={"Search Input"}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />,
          <IconButton
            key={"Next Page"}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosIcon />
          </IconButton>,
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
      <MobileHeaderBlock
        leftSlot={[
          <IconButton
            key={"Previous Page mobile"}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowBackIosIcon />
          </IconButton>,
        ]}
        rightSlot={[
          <IconButton
            key={"Next Page mobile"}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosIcon />
          </IconButton>,
        ]}
      />
      <CustomGrid container>
        {paginatedData?.map((item) => (
          <Sticky item={item} onClick={handleModalOpen} key={item._id} />
        ))}
      </CustomGrid>
      <MobileButton onClick={() => handleModalOpen(false, null)} />
      <ToDoModal
        open={isOpen}
        handleModalOpen={handleModalOpen}
        edit={isEdit}
        activeTodo={activeTodo}
      />
    </>
  );
};
