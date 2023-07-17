import { FC, useState, ChangeEvent, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios from "axios";

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

const PAGE_SIZE = 4;

export const MainPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async (): Promise<Todo[]> => {
    const response = await axios.get("http://localhost:5050/todo");
    return response.data;
  }; // function to fetch data from server

  const { data } = useQuery<Todo[]>(["data"], fetchData); // fetch data from server

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

  const handleModalOpen = (edit: boolean) => {
    setIsOpen(!isOpen);
    setIsEdit(edit);
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
            onClick={() => handleModalOpen(false)}
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
      <CustomGrid container>
        {paginatedData?.map((item) => (
          <Sticky item={item} onClick={handleModalOpen} key={item._id} />
        ))}
      </CustomGrid>
      <MobileButton onClick={() => handleModalOpen(true)} />
      <ToDoModal
        open={isOpen}
        handleModalOpen={handleModalOpen}
        edit={isEdit}
      />
    </>
  );
};
