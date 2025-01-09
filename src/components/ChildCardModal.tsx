import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

{/* Bit redundant given that data is mock but a small extra */}

interface ChildCardModalProps {
  open: boolean;
  onClose: () => void;
  child: {
    name: string;
    birthday?: string;
    gender?: number;
    homeAddress?: string | null;
    extraInfo?: string;
  } | null;
}

const ChildCardModal: React.FC<ChildCardModalProps> = ({ open, onClose, child }) => {
  if (!child) return null;

  const formatDate = (date: string) => { //should be a reusable function
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-details-title"
      aria-describedby="child-details-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="child-details-title" variant="h6" component="h2">
          {child.name}
        </Typography>
        <Typography id="child-details-description" sx={{ mt: 2 }}>
        <strong>Birthday:</strong> {child.birthday ? formatDate(child.birthday) : 'N/A'}
        </Typography>
        <Typography>
          <strong>Gender:</strong> {child.gender === 1 ? 'Male' : 'Female'}
          {/* child.gender data not consistent with name, just for extra */}
        </Typography>
        <Typography>
          <strong>Address:</strong> {child.homeAddress || 'N/A'}
        </Typography>
        <Typography>
          <strong>Extra Info:</strong> {child.extraInfo || 'N/A'}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ChildCardModal;