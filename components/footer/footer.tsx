import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function Footer() {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
    }
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#00843d",
        color: "#fff",
        width: "100%",
        textAlign: "center",
        padding: "1rem",
        mt: "auto",
      }}
    >
      {/* Quick Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link href="/credits" color="inherit" underline="hover">
          About Us
        </Link>
        <Link href={`/profile/${userID}`} color="inherit" underline="hover">
          Your Profile
        </Link>
        <Link href="/orders" color="inherit" underline="hover">
          Your Orders
        </Link>
      </Box>

      {/* Social Media Links */}
      <Box mt={1} sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <IconButton
          href="https://www.facebook.com"
          target="_blank"
          color="inherit"
          aria-label="Facebook"
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="https://www.twitter.com"
          target="_blank"
          color="inherit"
          aria-label="Twitter"
        >
          <Twitter />
        </IconButton>
        <IconButton
          href="https://www.instagram.com"
          target="_blank"
          color="inherit"
          aria-label="Instagram"
        >
          <Instagram />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" color="inherit" className="" mt={1}>
        © {new Date().getFullYear()} CPPLib. All rights reserved.
      </Typography>
    </Box>
  );
}
