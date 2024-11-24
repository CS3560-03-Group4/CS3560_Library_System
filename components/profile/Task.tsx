"use client";

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Task: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {/* Manage Catalog Button */}
        <Button
          variant={'contained'}
        //   onClick={() => setActiveTask('Manage Catalog')}
          sx={{
            color: 'black',
            borderColor: 'black',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#00843D', color: 'white' },
          }}
        >
          Manage Catalog
        </Button>

        {/* Manage Orders Button */}
        <Button
          variant={'contained'}
        //   onClick={() => setActiveTask('Manage Orders')}
          sx={{
            color: 'black',
            borderColor: 'black',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#00843D', color: 'white' },
          }}
        >
          Manage Orders
        </Button>
      </Box>
    </Box>
  );
};

export default Task;