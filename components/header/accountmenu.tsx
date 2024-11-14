import { db } from "@/lib/db";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import OrderIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { getUserByUserID } from "@prisma/client/sql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountMenu({ className }: { className: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  // const userID = localStorage.getItem("userID") || null; // Fallback to "User" if not found

  // // Retrieve first name from localStorage
  useEffect(() => {
    //   const getFirstName = async () => {
    //     const user = await db.$queryRawTyped(
    //       getUserByUserID(localStorage.get("userID"))
    //     );
    //     if (user.length > 0) {
    //       firstInitial = user[0].firstName.charAt(0).toUpperCase();
    //     } else {
    //       firstInitial = "";
    //     }
    //   };
    // getFirstName();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear token or other auth information
    router.push("/sign-in"); // Redirect to sign-in page
    handleClose();
  };

  const handleMyOrders = () => {
    router.push("/orders"); // Replace "/orders" with the actual path to your orders page
    handleClose();
  };

  return (
    <>
      <Tooltip title="Account settings" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/* Circle with First Initial */}
          <div className={className}>{"A"}</div>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMyOrders}>
          <ListItemIcon>
            <OrderIcon fontSize="small" />
          </ListItemIcon>
          My Orders
        </MenuItem>
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
