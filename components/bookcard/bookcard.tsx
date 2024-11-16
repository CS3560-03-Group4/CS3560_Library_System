import React from 'react';
import { Card, CardMedia, CardContent, Typography, Checkbox, Box } from '@mui/material';

interface BookProps {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}

const BookCard: React.FC<BookProps> = ({ title, author, date, imageUrl }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Card sx={{
      maxWidth: 345,
      boxShadow: 3,
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={`Cover of ${title}`}
        sx={{ height: 300, width: '100%' }}
      />
      <CardContent sx={{ bgcolor: '#fff' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
          by {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
      <Checkbox
        checked={isChecked}
        onChange={handleCheck}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'primary.main',
          '&.Mui-checked': {
            color: 'primary.dark',
          }
        }}
      />
    </Card>
  );
};

export default BookCard;
