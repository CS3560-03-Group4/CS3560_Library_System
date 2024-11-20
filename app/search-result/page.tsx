'use client'
import React from 'react';
import BookCard from "@/components/bookcard/bookcard";  
import { Box, Grid2, Divider } from "@mui/material";
import Head from 'next/head';

  const SearchResults: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
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
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 3,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 4,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 5,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 6,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 7,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        {
            id: 8,
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            date: '11/16/2011',
            imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SL1500_.jpg',
        },
        
        // add more book here
      ];
  
      return (
        <>
            <>
                <Head>
                    <title>Search Results</title>
                    <meta name="description" content="View the search results on our site." />
                </Head>
            </>
          <Grid2 container padding={2}>
            {/* Component structure */}
            <Box  
                sx={{
                    padding: "80px", // Padding around the content area
                    justifyConten:"center", // Centers the content horizontally
                }}
            ></Box>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <h1 className="text-3xl font-bold">Results for "{searchQuery}"</h1>
              <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", flexWrap: 'wrap', justifyContent: 'space-between', width: '100%',}}>
                {books.map(book => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    date={book.date}
                    imageUrl={book.imageUrl}
                  />
                ))}
              </div>
            </Grid2>
          </Grid2>
        </>
      );
    };
    
    export default SearchResults;
  