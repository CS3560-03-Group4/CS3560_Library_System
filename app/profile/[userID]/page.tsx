'use client';

import OrderTable from "@/components/profile/OrderTable";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Divider, Grid2 } from "@mui/material";
import { Metadata } from "next";
import StaffInfo from "@/components/profile/StaffInfo";
import CatalogSummary from "@/components/profile/CatalogSummary";
import Task from "@/components/profile/Task";
import React, { useState, useEffect } from 'react';

// Commenting out because this conflicts with 'use client'
// export const metadata: Metadata = {
//   title: "My Profile",
// };

export default function Profile({ params }: { params: { userID: string } }) {
  const { userID } = params;
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  // Fetch total books
  const fetchTotalBooks = async () => {
    try {
      const response = await fetch('/api/getTotalBooks');
      const data = await response.json();
      setTotalBooks(data.total);
    } catch (error) {
      console.error('Error fetching total books:', error);
    }
  };

    // Fetch total orders
    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('/api/getTotalOrders');
        const data = await response.json();
        setTotalOrders(data.total);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    // Fetch data when component mounts
    useEffect(() => {
      fetchTotalBooks();
      fetchTotalOrders();
    }, []);

  return (
    <>
      <Grid2 container padding={2}>
        {/* Left Banner */}
        <Grid2 size={{ xs: 12, md: 2 }}>
          {/* <ProfileInfo userID={userID} /> */}
          <StaffInfo userID={userID} />
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
          {/* <h1 className="text-3xl font-bold">Order History</h1>
          <div className="mt-4">
            <OrderTable />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Overdue Payment</h1> */}

          {/*ADD CONDITION TO Display for staff */}
          {/* Heading */}
          <h1 className="text-4xl font-bold mb-6">Summary</h1>
          
          {/* Catalog Summary */}
          <div className="mt-4 scale-110" style={{ width: "10%" }}> 
            <CatalogSummary totalBooks={totalBooks} totalOrders={totalOrders} />
          </div>

          {/* Spacing between components */}
          <div className="my-12"></div> {/* Adds vertical space */}

          {/* Task Section */}
          <h1 className="text-4xl font-bold mb-6">What To Do?</h1>
          <div className="mt-4 scale-110" style={{ width: "40%" }}>
            <Task />
          </div>
        </Grid2>
      </Grid2>
    </>
  );
}
