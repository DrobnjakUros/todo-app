import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider, createTheme } from "@mui/material";

import { MainPage } from "./components/organisms";

function App() {
  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
