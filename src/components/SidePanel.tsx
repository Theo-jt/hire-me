import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const SidePanel: React.FC = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#8644e4', //to be consistent with branding
        color: 'white',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Famly Dashboard
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Checkin" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SidePanel;