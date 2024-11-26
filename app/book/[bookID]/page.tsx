"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { formatDate } from "@/lib/utils";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookPage({ params }: { params: { bookID: string } }) {
  const router = useRouter();
  const { cart, setCart } = useCart();
  const { bookID } = params;
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [bookInfo, setBookInfo] = useState({
    // [var, function to update var]
    title: "",
    author: "",
    datePublished: "",
    description: "",
    publisher: "",
    numberOfPages: "",
    genre: "",
    imageURL: "",
    quantityInStock: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);


  // Sync cart state from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart); // Update cart context
    setIsAdded(storedCart.includes(bookID)); // Update isAdded based on persisted cart
  }, [bookID, setCart]);
  
  // Use when fetching data from DB
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await fetch(`/api/book/${bookID}`);
        const book = await response.json(); // Results got from route.ts in api/book/[bookID]
        console.log(book);
        setBookInfo({
          ...bookInfo,
          title: book.title,
          author: book.author,
          datePublished: formatDate(book.datePublished),
          description: book.description,
          publisher: book.publisher,
          numberOfPages: book.numberOfPages,
          genre: book.genre,
          imageURL: book.imageURL,
          quantityInStock: book.quantity,
        });
      } catch (error) {
        console.error("Error fetching book info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookInfo();
  }, [bookID]);

  const handleAddToCart = () => {
    if (isAdded) return;

    const updatedCart = [...cart, bookID];
    setCart(updatedCart);
    setIsAdded(true);
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      {isLoading ? (
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
          <CircularProgress color="success" />
          <Typography sx={{ mt: 2 }}>Fetching book information...</Typography>
        </Box>
      ) : (
        <div className="min-h-screen bg-gray-200/65 flex justify-center items-center p-6">
          {/* Main Content Section */}
          <div className="w-full max-w-7xl grid grid-rows-[1fr_auto] gap-8 bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            {/* Book Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
              {/* Left: Book Cover */}
              <div className="flex justify-center items-center">
                <div className="w-full max-w-sm h-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={bookInfo.imageURL} // Replace with the actual image path
                    alt="Soul Screamers Cover"
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>

              {/* Right: Book Description */}
              <div className="flex flex-col">
                <Card className="shadow-none border-none h-full">
                  <CardHeader>
                    <CardTitle className="text-4xl md:text-5xl font-bold">
                      {bookInfo.title}
                    </CardTitle>
                    <p className="text-gray-500 mt-2 text-xl md:text-2xl">
                      by {bookInfo.author}
                    </p>
                    <p className="text-gray-400 text-lg mt-1">
                      Published on {bookInfo.datePublished}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed border-t border-gray-300 pt-6">
                      {bookInfo.description &&
                        bookInfo.description
                          .split("\\n")
                          .map((word, index) => <p key={index}>{word}</p>)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Book Information Section */}
            <div className="flex justify-between gap-6 border-t border-gray-300 pt-8 text-lg md:text-xl text-gray-700">
              <div>
                <p className="font-bold text-sm md:text-2xl">Publisher:</p>
                <p className="text-sm md:text-xl">{bookInfo.publisher}</p>
              </div>
              <div>
                <p className="font-bold text-sm md:text-2xl">Print Length:</p>
                <p className="text-sm md:text-xl">
                  {bookInfo.numberOfPages} pages
                </p>
              </div>
              <div>
                <p className="font-bold text-sm md:text-2xl">Genre:</p>
                <p className="text-sm md:text-xl">{bookInfo.genre}</p>
              </div>
              <div>
                <p className="font-bold text-sm md:text-2xl">Available:</p>
                <p className="text-sm md:text-xl">
                  {bookInfo.quantityInStock} in stock
                </p>
              </div>
            </div>

            {/* Bottom Button Section */}
            <div className="flex justify-end gap-4 md:gap-8 mt-4">
              <Button
                disabled={isAdded}
                className={`bg-primary text-white hover:bg-[#4095ea] hover:text-black px-8 py-3 rounded-xl shadow-xl text-lg md:text-xl ${
                  cart.includes(bookID)
                    ? "disabled:opacity-25 disabled:cursor-not-allowed"
                    : ""
                }`}
                onClick={handleAddToCart}
              >
                {cart.includes(bookID) ? "Added to cart" : "Add to cart"}
              </Button>
              <Button
                className="bg-gray-600 text-white hover:bg-gray-400/95 hover:text-black px-8 py-3 rounded-xl shadow-xl text-lg md:text-xl"
                onClick={() => router.back()}
              >
                Go back
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
