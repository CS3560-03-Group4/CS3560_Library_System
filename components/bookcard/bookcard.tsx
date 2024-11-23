import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// Define the prop types for the BookCard component
interface BookProps {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}
// Functional component BookCard using React.FC with BookProps for type definition
const BookCard: React.FC<BookProps> = ({
  id,
  title,
  author,
  date,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    // Card component from MUI styled using the sx prop
    <Card
      sx={{
        maxWidth: 345, // Max width of the card
        boxShadow: 3, // Shadow depth for 3D effect
        borderRadius: "10px", // Rounded corners of the card
        overflow: "hidden", // Hides anything going out of the bounds of the card
        position: "relative", // Used for positioning the IconButton absolutely within the card
        transition: "0.3s", // Smooth transition for hover effect
        "&:hover": {
          transform: "scale(1.05)", // Enlarges the card on hover
          boxShadow: "0px 5px 15px rgba(0,0,0,0.3)", // Darkens the shadow on hover
        },
      }}
    >
      <CardActionArea onClick={() => router.push(`/book/${id}`)}>
        {/* CardMedia to display book image */}
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Set width to match the Card's width
            height: 300, // Set a fixed height
            objectFit: "contain", // Ensures the image covers the area without stretching
            bgcolor: "#00843d",
          }}
          image={imageUrl}
          alt={`Cover of ${title}`}
          onError={(e) => (e.currentTarget.src = "/placeholder_image.png")} // Fallback image
        />
        {/* CardContent contains the text elements of the card */}
        <CardContent sx={{ bgcolor: "#fff" }}>
          {/* Background color: white */}
          {/* Link to detailed page */}
          <Link href={`/book/${id}`} passHref>
            <Typography
              component="a"
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {title} {/* Display the book title */}
            </Typography>
          </Link>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            by {author} {/* Display the author */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date} {/* Display the date */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
