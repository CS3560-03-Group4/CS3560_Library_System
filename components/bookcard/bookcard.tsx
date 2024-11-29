import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// Define the prop types for the BookCard component
export interface BookProps {
  bookID: string;
  title: string;
  author: string;
  datePublished: string;
  imageURL: string;
}
// Functional component BookCard using React.FC with BookProps for type definition
const BookCard: React.FC<BookProps> = ({
  bookID,
  title,
  author,
  datePublished,
  imageURL,
}) => {
  const router = useRouter();

  return (
    // Card component from MUI styled using the sx prop
    <Card
      sx={{
        width: "100%", // Let the card take full width of its container
        maxWidth: "30rem", // Set a max width for the card
        boxShadow: 3, // Shadow depth for 3D effect
        borderRadius: "10px", // Rounded corners
        overflow: "hidden", // Ensure content fits within bounds
        position: "relative", // Needed for positioning
        transition: "0.3s", // Smooth transition
        "&:hover": {
          transform: "scale(1.045)", // Scale slightly on hover
          boxShadow: "0px 5px 15px rgba(0,0,0,0.3)", // Enhance shadow
        },
      }}
    >
      <CardActionArea onClick={() => router.push(`/book/${bookID}`)}>
        {/* CardMedia to display book image */}
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Image scales to match card's width
            height: "auto", // Maintain aspect ratio
            aspectRatio: "2 / 3", // Explicit aspect ratio
            bgcolor: "#00843d", // Fallback background color
          }}
          image={imageURL}
          alt={`Cover of ${title}`}
          onError={(e) => (e.currentTarget.src = "/placeholder_image.png")} // Fallback image
        />
        {/* CardContent contains the text elements of the card */}
        <CardContent sx={{ bgcolor: "#fff" }}>
          {/* Background color: white */}
          {/* Link to detailed page */}
          <Link href={`/book/${bookID}`} passHref>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.4rem" }, // Responsive font size
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
            sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            by {author} {/* Display the author */}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            {datePublished} {/* Display the date */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
