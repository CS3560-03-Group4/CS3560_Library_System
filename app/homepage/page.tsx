"use client";

import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Grid2 } from '@mui/material';
import Headbar from '@/components/header/headbar';
import Footer from '@/components/footer/footer';
import Bookcard from '@/components/bookcard/bookcard';

// Data for categories and books
const categories = ['Trending', 'Fiction', 'Non-fiction', 'Thriller', 'Mystery', 'Fantasy', 'Computer Science', 'More'];

// Data for books
const books = [
  {
    id: 1,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    date: '11/16/2011',
    imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
  },
  {
    id: 2,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    date: '09/21/1937',
    imageUrl: 'https://i.thriftbooks.com/api/imagehandler/m/305401ED0E83C812C6D15A28261F19486F507B74.jpeg',
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    date: '04/10/1925',
    imageUrl: 'https://m.media-amazon.com/images/I/61dRoDRubtL._SL1500_.jpg',
  },
  // add more book here
];

const HomePage: React.FC = () => {
  // Function to handle category click
  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on category: ${category}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Headbar />

      {/* Content Section */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <List>
            {categories.map((category) => (
              <ListItem
                key={category}
                component="button"
                onClick={() => handleCategoryClick(category)}
                sx={{
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid2 container spacing={3}>
            {books.map((book) => (
              <Grid2
                key={book.id}
                sx={{
                    gridColumn:{
                        xs: 'span 12', // Full width on extra-small screens
                        sm: 'span 6', // Half width on small screens
                        md: 'span 4',  // One-third width on medium screens
                    },
                }}
              >
                {/* Book Card */}
                <Bookcard
                  id ={book.id}
                  title={book.title}
                  author={book.author}
                  date={book.date}
                  imageUrl={book.imageUrl}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;