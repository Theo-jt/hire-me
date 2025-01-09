import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface CardProps {
  item: {
    id: string;
    name: string;
    state: string;
    image: string;
  };
  onClick: () => void;
  onAction: (id: string, state: string, name: string) => void;
}

const ChildCard: React.FC<CardProps> = ({ item, onClick, onAction }) => {
  return (
    <MuiCard sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={item.image || 'https://via.placeholder.com/140'}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.name}
        </Typography>
        <Button
          variant="contained"
          color={item.state === 'checkin' ? 'primary' : 'secondary'}
          onClick={(e) => {
            e.stopPropagation();
            onAction(item.id, item.state, item.name);
          }}
        >
          {item.state === 'checkin' ? 'Check In' : 'Check Out'}
        </Button>
      </CardContent>
    </MuiCard>
  );
};

export default ChildCard;