import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface BookRideProps {
  open: boolean;
  onClose: () => void;
  onBook: (startLocation: string, endLocation: string) => void;
}

const BookRide: React.FC<BookRideProps> = ({ open, onClose, onBook }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleBook = () => {
    onBook(startLocation, endLocation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book a Ride</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Start Location"
          type="text"
          fullWidth
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="End Location"
          type="text"
          fullWidth
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleBook} color="primary">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookRide;
