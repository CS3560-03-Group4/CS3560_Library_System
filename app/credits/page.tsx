import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function Credits() {
  const contributors = [
    {
      name: "David Lam",
      role: "Project Manager, UI Designer, Full-stack Developer",
    },
    { name: "Tam Tran", role: "Full-stack Developer" },
    { name: "An Nguyen", role: "Full-stack Developer" },
    { name: "Thu Nguyen", role: "UI Designer, Full-stack Developer" },
    { name: "Tram Tran", role: "UI Designer, Full-stack Developer" },
    { name: "Viet Tran", role: "Full-stack Developer" },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Objective Section */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Objective
        </Typography>
        <Typography variant="body1">
          Our goal of this project is to create an online library system that
          manages book catalog and inventory. Ensure this web application
          provides streamlined library services for students and library staff.
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      {/* Contributors Section */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Contributors
        </Typography>
        <List>
          {contributors.map((contributor, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" fontWeight="medium">
                {contributor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contributor.role}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
