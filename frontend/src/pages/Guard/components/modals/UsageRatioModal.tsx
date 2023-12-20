import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { OneWeekRatioInfo } from "../../../../types";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  // datas[date , ratio]
  ratioInfo: OneWeekRatioInfo | null;
};

export default function UsageRatioModal(props: ModalProps) {
  const { open, onClose, ratioInfo } = props;

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
            Usage Ratio History
          </Typography>
          <Grid container spacing={2}>
            {/* Map through 7 days */}
            {/* {datas.map((item, index) => (
              <Grid item key={index} xs={3} className='text-center'>
                <Typography id={`transition-modal-description-${index}`} sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                  {item.date}
                </Typography>
                <span className='font-medium md:text-lg text-center'>{item.ratio}</span>
              </Grid>
            ))} */}
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[0]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[0]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[1]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[1]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[2]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[2]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[3]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[3]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center' >
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[4]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[4]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[5]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[5]} %</span>
            </Grid>
            <Grid item xs={3} className='text-center'>
              <Typography id="transition-modal-description" sx={{ mt: 2 }} fontFamily="lexend" color="#214F6D">
                {ratioInfo?.dates[6]}
              </Typography>
              <span className='font-medium md:text-lg text-center'>{ratioInfo?.usageRatios[6]} %</span>
            </Grid>
          </Grid>          
        </Box>
      </Fade>
    </Modal>
  );
}

