"use client";

import { useUser } from "@/contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import OrderIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountMenu({ className }: { className: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { firstInitial, isAuthenticated, logout } = useUser();
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/sign-in"); // Redirect to sign-in page
    handleClose();
  };

  return (
    <>
      {isAuthenticated ? (
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Circle with First Initial */}
            <div className={className}>{firstInitial}</div>
          </IconButton>
        </Tooltip>
      ) : (
        <Link
          href="/sign-in"
          color="inherit"
          className="text-lg p-2 hover:bg-green-100/70 hover:text-black rounded-xl"
        >
          Sign in
        </Link>
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href={`/profile/${userID}`}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Link
          href="/orders"
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <OrderIcon fontSize="small" />
            </ListItemIcon>
            My Orders
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ color: "red", fontWeight: "bold" }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
