"use client";

import CatalogSummary from "@/components/profile/CatalogSummary";
import Task from "@/components/profile/Task";
import {
  Box,
  CircularProgress,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import StudentInfo from "@/components/profile/StudentInfo";
import StaffInfo from "@/components/profile/StaffInfo";

export default function Profile({ params }: { params: { userID: string } }) {
  const { userID } = params;
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [role, setRole] = useState<string | null>("");
  const [isLoading, setISLoading] = useState<boolean>(true);

  const getRole = async () => {
    try {
      const response = await fetch(`/api/user/${userID}`);
      const data = await response.json();
      setRole(data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    } finally {
      setISLoading(false);
    }
  };

  // Fetch total books
  const fetchTotalBooks = async () => {
    try {
      const response = await fetch("/api/getTotalBooks");
      const data = await response.json();
      setTotalBooks(data.total);
    } catch (error) {
      console.error("Error fetching total books:", error);
    }
  };

  // Fetch total orders
  const fetchTotalOrders = async () => {
    try {
      const response = await fetch("/api/getTotalOrders");
      const data = await response.json();
      setTotalOrders(data.total);
    } catch (error) {
      console.error("Error fetching total orders:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getRole();
    fetchTotalBooks();
    fetchTotalOrders();
  }, []);

  console.log(role === "STUDENT");
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
          <Typography sx={{ mt: 2 }}>Fetching user profile...</Typography>
        </Box>
      ) : (
        <Grid2 container padding={2}>
          {/* Left Banner */}
          <Grid2 size={{ xs: 12, md: 2 }}>
            {role === "STUDENT" ? (
              <StudentInfo userID={userID} />
            ) : (
              <StaffInfo userID={userID} />
            )}
          </Grid2>
          <Grid2>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ margin: "0 2rem 0 0" }}
              className="min-h-svh hidden lg:block"
            />
          </Grid2>

          {/* Right Area with Form */}
          <Grid2 size={{ xs: 12, md: 8 }}>
            {role === "STUDENT" ? (
              <h1 className="mt-4 text-3xl font-bold">Overdue Payment</h1>
            ) : (
              <>
                {/* Heading */}
                <h1 className="text-4xl font-bold mb-6">Summary</h1>
                {/* Catalog Summary */}
                <div className="mt-4 scale-110" style={{ width: "10%" }}>
                  <CatalogSummary
                    totalBooks={totalBooks}
                    totalOrders={totalOrders}
                  />
                </div>
                {/* Spacing between components */}
                <div className="my-12"></div> {/* Adds vertical space */}
                {/* Task Section */}
                <h1 className="text-4xl font-bold mb-6">What To Do?</h1>
                <div className="mt-4 scale-110" style={{ width: "40%" }}>
                  <Task />
                </div>
              </>
            )}
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
