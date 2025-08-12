// src/mui-theme/theme.ts
import { createTheme } from "@mui/material/styles";

export const genshinTheme = createTheme({
  palette: {
    primary: {
      main: "#d4af37", 
      contrastText: "#fff",
    },
    secondary: {
      main: "#1e3a5f", 
    },
    background: {
      default: "#f5f0e6", 
      paper: "#faf5e1", 
    },
    text: {
      primary: "#3a2c1a",
    },
  },
  typography: {
    fontFamily: `"Merriweather", serif`,
    h4: {
      fontWeight: 700,
      letterSpacing: "0.05em",
    },
    body1: {
      fontFamily: `"Open Sans", sans-serif`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontWeight: 600,
          textTransform: "none",
          background: "linear-gradient(135deg, #d4af37 0%, #c1972c 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          "&:hover": {
            background: "linear-gradient(135deg, #e0b94b 0%, #cda632 100%)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#d4af37",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#d4af37",
            },
            "&:hover fieldset": {
              borderColor: "#c1972c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#d4af37",
              boxShadow: "0 0 6px rgba(212, 175, 55, 0.5)",
            },
          },
        },
      },
    },
  },
});
