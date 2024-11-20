"use client";

import BookCard from "@/components/bookcard/bookcard";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

// Data array for categories that will be listed in the sidebar
const categories = [
  "Trending",
  "Fiction",
  "Non-fiction",
  "Thriller",
  "Mystery",
  "Fantasy",
  "Computer Science",
  "More",
];
// Object containing arrays of book data categorized by genres
const booksByCategory = {
  "Trending Books": [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      date: "11/16/2011",
      imageUrl: "https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg",
    },
    {
      id: 2,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      date: "09/21/1937",
      imageUrl:
        "https://i.thriftbooks.com/api/imagehandler/m/305401ED0E83C812C6D15A28261F19486F507B74.jpeg",
    },
    {
      id: 3,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      date: "11/16/2011",
      imageUrl: "https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      date: "09/21/1937",
      imageUrl:
        "https://i.thriftbooks.com/api/imagehandler/m/305401ED0E83C812C6D15A28261F19486F507B74.jpeg",
    },
    // add more books here
  ],
  "Non-fiction": [
    {
      id: 5,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "04/10/1925",
      imageUrl: "https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg",
    },
    {
      id: 6,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "04/10/1925",
      imageUrl: "https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg",
    },
    {
      id: 7,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "04/10/1925",
      imageUrl: "https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg",
    },
    {
      id: 8,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "04/10/1925",
      imageUrl: "https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg",
    },
    // add more books here
  ],
  // add more categories here
};
// Main React component for the Home page
export default function Home() {
  // Function to handle click events on category items
  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on category: ${category}`);
  };
  // Render the component
  return (
    // Box is used for layout structure, styled
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar container for category listings */}
      <Box
        sx={{
          position: "fixed", // Keeps the sidebar visible while scrolling
          // top: 0, // Aligns the sidebar at the top of the viewport
          // height: "100vh", // Full viewport height
          bgcolor: "white", // Background color
          // width: "200px", // Fixed width for the sidebar
          overflowY: "auto", // Allows scrolling if content exceeds the viewport height
          borderRight: "1px solid #ddd", // Right border styling
          zIndex: 1,
        }}
      >
        {/* List component that contains clickable list items for categories */}
        <List sx={{ width: "100%", padding: "0.5rem 0.8rem" }}>
          {categories.map((category, index) => (
            <ListItem
              component="button"
              key={index}
              onClick={() => handleCategoryClick(category)}
              sx={{
                borderBottom: "2px solid #ddd",
                borderRadius: "5px",
                boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                marginBottom: "5px",
                justifyContent: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition
                "&:hover": {
                  backgroundColor: "#00843d",
                  color: "white",
                  boxShadow: 5,
                  transform: "scale(1.08)",
                },
              }}
            >
              <ListItemText primary={category} />{" "}
              {/* Displayed the category name */}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content Area for displaying books by category */}
      <Box
        sx={{
          marginLeft: "12rem",
          width: "100%",
          flex: 1, // Takes up remaining space after the sidebar
          padding: "0 1.5rem 1.5rem 1.5rem", // Padding around the content area
          justifyContent: "center", // Centers the content horizontally
        }}
      >
        {/* Iterates over each category and its books to render them */}
        {Object.entries(booksByCategory).map(([category, books]) => (
          <React.Fragment key={category}>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 2,
                color: "#00843d",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {category}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 2,
                width: "100%",
              }}
            >
              {books.map((book) => (
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  date={book.date}
                  imageUrl={book.imageUrl}
                />
              ))}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
