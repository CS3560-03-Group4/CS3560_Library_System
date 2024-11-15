// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Home() {
//   // const router = useRouter();
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // useEffect(() => {
//   //   // Check if user is authenticated by looking for a token in localStorage
//   //   const token = localStorage.getItem("authToken"); // Replace "authToken" with your actual token key
//   //   if (token) {
//   //     setIsAuthenticated(true);
//   //   } else {
//   //     router.push("/sign-in"); // Redirect to sign-in if not authenticated
//   //   }
//   // }, [router]);

//   return (
//     <>
//       <main className="flex flex-col flex-grow items-center">
//         <h1 className="text-3xl font-bold mt-8">Home page</h1>
//       </main>
//     </>
//   );
// }

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Check out testing!!
      </Typography>

      {/* Checkout Button with Custom Green Color */}
      <Button
        variant="contained"
        onClick={handleCheckout}
        sx={{
          backgroundColor: "#00843d", // Set to the same green color
          color: "#fff",
          "&:hover": {
            backgroundColor: "#006400", // Darker green for hover effect
          },
        }}
      >
        Go to Checkout
      </Button>
    </Box>
  );
}
