import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { LogoDev as LogoDevIcon } from "@mui/icons-material/";
import { CustomAppBar, Menus, CustomToolbar } from "./MainHeader.styled";
import Link from "next/link";

export const MainHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);

  const PAGE_LINKS = [
    {
      url: "/products",
      _id: 1,
      name: "Products",
    },
  ];

  return (
    <>
      <CustomAppBar>
        <Box className="Background" />
        <Container>
          <CustomToolbar className="p-l p-r">
            <Link href="/">
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography variant="h6">Fractal Ordering System</Typography>
              </Stack>
            </Link>
            <Menus>
              {PAGE_LINKS.map((pl) => (
                <Link className="Menu" href={pl.url} key={pl._id}>
                  <Typography>{pl.name}</Typography>
                </Link>
              ))}
            </Menus>
          </CustomToolbar>
        </Container>
      </CustomAppBar>
    </>
  );
};
