import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tooltip
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
        width: '100%',
        minWidth: 150,
        maxWidth: 180,
        flex: "0 0 auto", // Prevent cards from shrinking or growing
        boxShadow: 3, // Shadow depth for 3D effect
        borderRadius: "10px", // Rounded corners
        overflow: "hidden", // Ensure content fits within bounds
        position: "relative", // Needed for positioning
        transition: "0.3s", // Smooth transition
        "&:hover": {
          transform: "scale(1.05)", // Scale slightly on hover
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
            height: 300,
            bgcolor: "#f4f4f4", // Fallback background color
          }}
          image={imageURL}
          alt={`Cover of ${title}`}
          onError={(e) => (e.currentTarget.src = "/placeholder_image.png")} // Fallback image
        />
        {/* CardContent contains the text elements of the card */}
        <CardContent sx={{ bgcolor: "#fff" }}>
        {/* Display the full title when the user hovers over it */}
        <Tooltip title={title} placement="top">
            <Link href={`/book/${bookID}`} passHref>
              <Typography
                noWrap
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 0.5,
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {title}
              </Typography>
            </Link>
          </Tooltip>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1, fontSize: "0.85rem" }}
          >
            by {author} {/* Display the author */}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            {datePublished} {/* Display the date */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;