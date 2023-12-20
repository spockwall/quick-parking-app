// import { useState } from "react";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Success from '../../assets/success.svg';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessModal(props: ModalProps) {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 240,
    bgcolor: '#ffffff',
    border: '2px solid rgb(74 222 128)',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
    fontFamily: 'Lexend, sans-serif',
    '@media (min-width: 768px)': {
      width: 300,
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
          <div className='flex justify-end'>
            <button>
              < CloseRoundedIcon onClick={() => handleClose()} />
            </button>            
          </div>
          <div className='flex flex-col align-middle items-center justify-between'>
            <img src={Success} className=" mb-2 w-24 h-24 sm:w-28 sm:h-28" />
            <Typography id="transition-modal-title" variant="h6" fontSize={22} color="black" fontFamily="lexend" className='text-center'>
              User Created!
            </Typography>
          </div>          
        </Box>
      </Fade>
    </Modal>
  );
}

