import { createTheme } from "@mui/material/styles";
import { teal, blueGrey, grey, red } from "@mui/material/colors";
import "@fontsource/roboto/400.css";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[800],
    },
    text: {
      primary: blueGrey[700],
      secondary: blueGrey[100],
    },
    background: {
      default: blueGrey[500],
      paper: grey[200],
    },
    error: {
      main: red[400],
      light: blueGrey[100],
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#F6F6F6",
          borderRadius: 25,
          padding: 25,
          height: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: 10,
          margin: 10,
          backgroundColor: "#f0a30a",
          color: "white",
          "&:hover": {
            backgroundColor: "#E79D09",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
