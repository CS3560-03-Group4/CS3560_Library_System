"use client";
import React, { useState, useEffect } from "react";
import BookCard, { BookProps } from "@/components/bookcard/bookcard";
import { Box, Grid2 } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";

interface SearchResultsProps {
  params: {
    searchQuery: string;
  };
}

export default function SearchResults({ params }: SearchResultsProps) {
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
      <Grid2 container padding={2}>
        {/* Component structure */}
        <Box
          sx={{
            padding: "80px", // Padding around the content area
            justifyContent: "center", // Centers the content horizontally
          }}
        ></Box>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <h1 className="text-3xl font-bold">
          Results for "{decodeURIComponent(searchQuery)}"
          </h1>
          {isLoading ? (
            <p>Loading books...</p> // Display while data is being fetched
          ) : (
            <div
              className="mt-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {books && books.length > 0 ? (
                books.map((book: BookProps) => (
                  <BookCard
                    key={book.bookID}
                    bookID={book.bookID}
                    title={book.title}
                    author={book.author}
                    datePublished={book.datePublished}
                    imageURL={book.imageURL}
                  />
                ))
              ) : (
                <p>No books found.</p> // Display if no books are found
              )}
            </div>
          )}
        </Grid2>
      </Grid2>
    </>
  );
}