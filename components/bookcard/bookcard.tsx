import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';

// Define the prop types for the BookCard component
interface BookProps {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}
// Functional component BookCard using React.FC with BookProps for type definition
const BookCard: React.FC<BookProps> = ({ id, title, author, date, imageUrl }) => {
  // State to manage whether the book has been added 
  const [isAdded, setIsAdded] = React.useState(false);

  // Handler for adding or removing a book, toggles the isAdded state
  const handleAdd = () => {
    setIsAdded(!isAdded);
  };
  // Component return JSX
  return (  
    // Card component from MUI styled using the sx prop 
    <Card sx={{
      maxWidth: 345, // Max width of the card
      boxShadow: 3, // Shadow depth for 3D effect
      borderRadius: '10px', // Rounded corners of the card
      overflow: 'hidden', // Hides anything going out of the bounds of the card
      position: 'relative', // Used for positioning the IconButton absolutely within the card
      transition: '0.3s', // Smooth transition for hover effect
      '&:hover': {
        transform: 'scale(1.05)', // Enlarges the card on hover
        boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' // Darkens the shadow on hover
      }
    }}>
      {/* CardMedia to display book image */} 
      <CardMedia
        component="img"
        sx={{
          width: 345, // Set width to match the Card's width
          height: 300, // Set a fixed height
          objectFit: 'cover' // Ensures the image covers the area without stretching
        }}
        image={imageUrl}
        alt={`Cover of ${title}`}
        onError={(e) => (e.currentTarget.src = 'path/to/fallback-image.jpg')}  // Fallback image
      />
      {/* CardContent contains the text elements of the card */}
      <CardContent sx={{ bgcolor: '#fff' }}> {/* Background color: white */}
        {/* Link to detailed page */}
        <Link href={`/book/${id}`} passHref>
          <Typography component="a" variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, textDecoration: 'none', color: 'inherit' }}>
            {title} {/* Display the book title */}
          </Typography>
        </Link>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
          by {author} {/* Display the author */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date} {/* Display the date */}
        </Typography>
      </CardContent>
      {/* IconButton to toggle the addition state of the book */}
      <IconButton
        onClick={handleAdd}
        aria-label={isAdded ? "Remove from added list" : "Add to added list"}
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          color: isAdded? 'primary.main' : 'primary.main', // Button color
          '&:hover': {
            color: 'primary.dark', // Button color on hover
          }
        }}>
        {isAdded ? <RemoveIcon /> : <AddIcon />} {/* Icon displayed in the button */}
      </IconButton>
    </Card>
  );
};

export default BookCard;
