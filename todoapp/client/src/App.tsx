import { ThemeProvider, createTheme, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Sticky } from "./components/molecules/sticky";

const toDoList: Todo[] = [
  { id: 1, title: "Buy milk", status: "New", priority: 5 },
  { id: 2, title: "Buy eggs", status: "Done", priority: 3 },
  { id: 3, title: "Buy bread", status: "InProgress", priority: 5 },
  { id: 4, title: "Buy butter", status: "New", priority: 4 },
  { id: 5, title: "Buy cheese", status: "InProgress", priority: 5 },
  { id: 6, title: "Buy coffee", status: "New", priority: 3 },
  { id: 7, title: "Buy tea", status: "New", priority: 2 },
  { id: 8, title: "Buy sugar", status: "New", priority: 1 },
  { id: 9, title: "Buy salt", status: "Done", priority: 2 },
  { id: 10, title: "Buy pepper", status: "New", priority: 1 },
  { id: 11, title: "Buy water", status: "New", priority: 4 },
];

// Custom container styled component with theme for grid container
const CustomGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#F2F7F7",
  padding: "32px",
  minHeight: "100vh",
  flexDirection: "row",
  gap: "32px",
  "@media (max-width: 768px)": {
    justifyContent: "center",
  },
}));

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#549FA4",
      },
      secondary: {
        main: "#4D6066",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CustomGrid container>
        {toDoList.map((item) => (
          <Sticky item={item} key={item.id} />
        ))}
      </CustomGrid>
    </ThemeProvider>
  );
}

export default App;
