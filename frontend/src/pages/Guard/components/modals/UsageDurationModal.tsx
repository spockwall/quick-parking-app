import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
    width: 300,
    bgcolor: '#6FC2DD',
    border: '2px solid #214F6D',
    borderRadius: '8px', 
    boxShadow: 24,
    p: 3,
    fontFamily: 'Lexend, sans-serif', 
    '@media (min-width: 550px)': {
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
          <div className='flex justify-end'>
            <button>
              < CloseRoundedIcon onClick={() => handleClose()} />
            </button>
          </div>
          <Typography id="transition-modal-title" variant="h6" fontSize={22} color="white" fontFamily="lexend" className='text-center'>
            Car Owner Detail
          </Typography>
          <table className="w-full m-auto border-spacing-8 mt-5">
            <tbody>
              <tr className='w-full flex flex-col justify-start sm:flex-row sm:justify-between'>
                <td className="text-blue-dark ">Name</td>
                <td className="text-black font-bold">Alice</td>
              </tr>
              <tr className='mt-2 w-full flex flex-col justify-start sm:flex-row sm:justify-between'>
                <td className="text-blue-dark ">Car ID</td>
                <td className="text-black font-bold">KA01BQ3232</td>
              </tr>
              <tr className='mt-2 w-full flex flex-col justify-start sm:flex-row sm:justify-between'>
                <td className="text-blue-dark ">Phone Number</td>
                <td className="text-black font-bold">0912345678</td>
              </tr>
              <tr className='mt-2 w-full flex flex-col justify-start sm:flex-row sm:justify-between'>
                <td className="text-blue-dark ">Email Address</td>
                <td className="text-black font-bold">XXX@gmaill.com </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Fade>
    </Modal>
  );
}

