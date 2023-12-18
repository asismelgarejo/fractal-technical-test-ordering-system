import { AppBar, Box, styled, AppBarProps } from "@mui/material";
type CustomAppBar = AppBarProps;
export const CustomAppBar = styled(
  AppBar,
  {}
)<CustomAppBar>(({ theme }) => ({}));
export const CustomToolbar = styled(Box)(({ theme }) => ({
  height: "70px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  a: {
    color: "white",
    textDecoration: "none",
  },
}));

export const Menus = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  ".Active": {
    background: theme.palette.secondary.main,
  },
  ".Menu": {
    padding: "0 1em",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
