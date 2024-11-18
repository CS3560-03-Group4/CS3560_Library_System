import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'; // Import Link component

interface BookProps {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}

const BookCard: React.FC<BookProps> = ({ id, title, author, date, imageUrl }) => {
  // Track to see if the book has been added 
  const [isAdded, setIsAdded] = React.useState(false);
  // Toggle the isAdded state
  const handleAdd = () => {
    setIsAdded(!isAdded);
  };

  return (
    <Card sx={{
      maxWidth: 345,        // Maximum width of the card
      boxShadow: 3,         // Shadow effect
      borderRadius: '10px', // Rounded corners
      overflow: 'hidden',   // Keeps children within the card boundaries
      position: 'relative', // For positioning the icon button absolutely
    }}>
      <CardMedia
        component="img"
        image={imageUrl}    // Source of the book image
        alt={`Cover of ${title}`}
        sx={{ height: 300, width: '100%' }} // Style for the image
      />
      <CardContent sx={{ bgcolor: '#fff' }}> // Content area for the text
        {/* Link to the Book Info Page using dynamic URL based on the bookID */}
        <Link to={`/book/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {title}   // Title of the book
          </Typography>
        </Link>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
          by {author} // Author name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}  //Publication date
        </Typography>
      </CardContent>
      {/* IconButton to toggle the addition of the book */}
      <IconButton
        onClick={handleAdd}
        sx={{
          position: 'absolute', //Absolute positioning
          top: 8,               // Top margin
          right: 8,             // Right margin
          color: 'primary.main',  // Theme color for the icon
          '&:hover': {            // Hover effects
            color: 'primary.dark',
          }
        }}
      >
        <AddIcon /> 
      </IconButton>
      
    </Card>
  );
};

export default BookCard;