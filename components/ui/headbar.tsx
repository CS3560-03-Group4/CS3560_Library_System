import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountMenu from "./accountmenu";
import Link from "@mui/material/Link";

// Styled component for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e0e0e0",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Headbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#00843d" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" noWrap component="div">
          CPPLib
        </Typography>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search for books…" inputProps={{ "aria-label": "search" }} />
        </Search>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/" color="inherit" underline="none" style={{ marginRight: 16 }}>
          <Button color="inherit">Home</Button>
        </Link>

        {/* Cart Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Account Menu with Logout */}
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Headbar;
