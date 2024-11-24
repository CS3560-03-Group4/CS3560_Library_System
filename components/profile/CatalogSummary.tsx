'use client';

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

// Define the props type
interface CatalogSummaryProps {
  totalBooks: number;
  totalOrders: number;
}

// CatalogSummary Component
const CatalogSummary: React.FC<CatalogSummaryProps> = ({ totalBooks, totalOrders }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
        {/* Cards Container */}
        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Total Books */}
            <Card sx={{ minWidth: 150, textAlign: 'center', backgroundColor: '#f9f9f9', boxShadow: 1 }}>
            <CardContent>
                <Typography variant="h4" component="div" color="success.main" sx={{ fontWeight: 'bold' }}>
                {totalBooks}
                </Typography>
                <Typography variant="body1">Total Books</Typography>
            </CardContent>
            </Card>

            {/* Total Orders */}
            <Card sx={{ minWidth: 150, textAlign: 'center', backgroundColor: '#f9f9f9', boxShadow: 1 }}>
            <CardContent>
                <Typography variant="h4" component="div" color="success.main" sx={{ fontWeight: 'bold' }}>
                {totalOrders}
                </Typography>
                <Typography variant="body1">Total Orders</Typography>
            </CardContent>
            </Card>
        </Box>
    </Box>
  );
};

export default CatalogSummary;