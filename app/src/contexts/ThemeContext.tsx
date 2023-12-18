import { ThemeProvider } from "@mui/material";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getTheme, ThemesModes } from "src/toolbox/theme";

type ThemeContextProps = {
  mode: ThemesModes;
  changeTheme(theme: ThemesModes): void;
};
const ThemeContext = createContext<ThemeContextProps>({
  mode: "defaultTheme",
  changeTheme(m: ThemesModes) {},
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemesModes>("darkTheme");

  const changeTheme = useCallback((m: ThemesModes) => setMode(m), []);

  const theme = useMemo(() => getTheme(mode), [mode]);
  theme.typography.h1 = {
    fontSize: "2.5em",
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      fontSize: "3em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4em",
    },
  };
  theme.typography.h2 = {
    fontSize: "2em",
    fontWeight: 400,
    [theme.breakpoints.up("sm")]: {
      fontSize: "3em",
    },
  };
  theme.typography.h3 = {
    fontSize: "1.5em",
    fontWeight: 400,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.6em",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5em",
    },
  };
  theme.typography.h4 = {
    fontSize: "1em",
    fontWeight: 100,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5em",
      fontWeight: 400,
    },
  };
  theme.typography.h6 = {
    fontSize: "1.2em",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      // fontSize: "2em",
    },
  };
  theme.typography.h5 = {
    fontSize: "1.5em",
    fontWeight: 100,
    [theme.breakpoints.up("md")]: {
      fontSize: "2em",
    },
  };
  theme.typography.caption = {
    fontSize: "1em",
    fontWeight: 100,
    [theme.breakpoints.up("md")]: {
      fontSize: "8px",
    },
  };
  theme.typography.body1 = {
    fontSize: "1.1em",
    fontWeight: 200,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5em",
    },
  };
  theme.typography.caption = {
    fontSize: ".8em",
    lineHeight: "1.5em",
    // fontWeight: 100,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1em",
      lineHeight: "2em",
    },
  };
  theme.typography.body2 = {
    fontSize: ".8em",
    fontWeight: 200,
    [theme.breakpoints.up("sm")]: {
      fontSize: ".9em",
      fontWeight: 200,
    },
  };
  if (theme.components?.MuiButton) {
    theme.components!.MuiButton = {
      styleOverrides: {
        contained: {
          fontSize: "1em",
          fontWeight: 500,
        },
        outlined: {
          fontSize: "1em",
          fontWeight: 500,
        },
      },
    };
  }
  return (
    <ThemeContext.Provider value={{ mode, changeTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
