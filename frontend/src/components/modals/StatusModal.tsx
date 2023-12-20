import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import type { parkingSpaceStatus } from "../../types";


type statusModalProps = {
  status?: parkingSpaceStatus;
  openModal: boolean;
  onClose: () => void;
};

export default function statusModal(props: statusModalProps) {
  const status = props.status;
  const { openModal, onClose } = props;

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
    p: 2,
    fontFamily: 'Lexend, sans-serif',
    '@media (min-width: 550px)': {
      width: 400,
      p: 3
    },
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <div className='flex justify-end'>
            <button>
              < CloseRoundedIcon onClick={() => handleClose()} />
            </button>
          </div>
          <Typography id="transition-modal-title" variant="h6" fontSize={22} color="white" fontFamily="lexend" className='text-center'>
            Space Information
          </Typography>
          <table className="w-full m-auto border-spacing-8 mt-2">
            <tbody>
              {Object.keys(status ?? {}).map((val, i) => (
                <tr key={i}>
                  <td className="w-2/5 text-left text-blue-dark ">{val.toUpperCase()} </td>
                  <td className="w-3/5 text-right text-black font-bold">{status?.[val as keyof parkingSpaceStatus]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Fade>
    </Modal>
  );
}