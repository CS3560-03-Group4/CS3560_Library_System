"use client";
import React, { useState, useEffect } from "react";
import BookCard, { BookProps } from "@/components/bookcard/bookcard";
import { Box, Grid2, CircularProgress, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface SearchResultsProps {
  params: {
    searchQuery: string;
  };
}

export default function SearchResults({ params }: SearchResultsProps) {
  const theme = useTheme();
  const router = useRouter();
  const { searchQuery } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<BookProps[]>([]);

  useEffect(() => {
    const fetchsearchBooks = async () => {
      try {
        const response = await fetch(`/api/search-result/${searchQuery}`);
        console.log(response);
        // Check if the response is ok (status 200)
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
        const book = await response.json();
        const bookResults = book.data;
        console.log("Fetch response:", bookResults);
        if (book) {
          setBooks(bookResults);
        }
      } catch (error) {
        console.error("Error fetching book info:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is complete
      }
    };
    fetchsearchBooks();
  }, [searchQuery]);

  return (
    <>
      <Head>
        <title>Search Results for {searchQuery}</title>
        <meta
          name="description"
          content="View the search results on our site."
        />
      </Head>
      <Grid2 container padding={2} direction="column" >
        {/* Component structure */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginLeft: {
                xs: '10px',
                sm: '20px',
                md: '30px',
                lg: '40px'
              },              
              marginBottom: theme.spacing(2) // Adds space below the text
            }}
          >
            Results for "{decodeURIComponent(searchQuery)}"
          </Typography>
        </Box>
          {isLoading ? (
            // Display while data is being fetched
            <Box 
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100vh",
              }}
            >
              <CircularProgress color="success"/> 
              <Typography sx={{ mt: 2 }}>Loading books...</Typography>
            </Box> 
          ) : (
            <Box
              sx={{
                marginLeft: {
                  xs: '10px',
                  sm: '20px',
                  md: '30px',
                  lg: '40px'
                },
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                },
                gap: '10px',
                rowGap: '40px',
                justifyContent: "center",

              }}
            >
              {books && books.length > 0 ? (
                books.map((book: BookProps) => (
                  <BookCard
                    key={book.bookID}
                    bookID={book.bookID}
                    title={book.title}
                    author={book.author}
                    datePublished={formatDate(book.datePublished)}
                    imageURL={book.imageURL}
                  />
                ))
              ) : (
                <Typography variant="subtitle1">
                  No books found.
                </Typography>
              )}
            </Box>
          )}
        </Grid2>
    </>
  );
}