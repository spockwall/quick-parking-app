// import { useState } from "react";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  // Name 
  // Car Id
  // Phone Number
  // Email Address
};

export default function UsageDurationModal(props: ModalProps) {
  const { open, onClose} = props;

  const handleClose = () => {
    onClose();
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: '#6FC2DD',
    border: '2px solid #214F6D',
    borderRadius: '8px', 
    boxShadow: 24,
    p: 3,
    fontFamily: 'Lexend, sans-serif', 
    '@media (min-width: 768px)': {
      width: 400, 
      p: 4
    },
  };

  return (
    <Modal 
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" fontSize={22} color="white" fontFamily="lexend" className='text-center'>
            Car Owner Detail
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
            Name            
          </Typography>
          <span className='font-medium md:text-lg'>Alice</span>
          <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
            Car ID
          </Typography>
          <span className='font-medium md:text-lg'>KA01BQ3232 </span>
          <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
            Phone Number
          </Typography>
          <span className='font-medium md:text-lg'>0912345678</span>
          <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
            Email Address
          </Typography>
          <span className='font-medium text-lg'>XXX@gmaill.com </span>
        </Box>
      </Fade>
    </Modal>
  );
}

