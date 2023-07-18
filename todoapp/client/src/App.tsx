import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";

import { store } from "./store/store";

import { MainPage, LoginPage } from "./components/organisms";


function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {!token ? <LoginPage setToken={setToken} /> : <MainPage />}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
