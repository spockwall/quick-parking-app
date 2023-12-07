import { useState } from "react";

import SelectedLotMenu from '../../../components/SelectedLotMenu';
import SelectedFloorMenu from '../../../components/SelectedFloorMenu';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import UsageRatioModal from "./modals/UsageRatioModal";
import ScrollToTopButton from '../../../components/ScrollToTopButton';

const CommonButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  padding: 8px 10px;
  border: 2px solid;
  border-radius: 12px;
  line-height: 1;
  background-color: #ffffff;
  border-color: #3B88C3;
  &:hover {
    border-color: blue-dark;
    background-color: #ffffff;
    box-shadow: 0 0 0 0.1rem #3B88C3;
  }
  &:focus {
    box-shadow: 0 0 0 0.1rem #3B88C3;
  }
  font-family: 'Lexend', sans-serif;
`;

export default function UsageRatio() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className='flex flex-col items-center justify-start'>
      <div className="mt-5 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
        <div className="hidden sm:flex">Usage Ratio</div>
        <div className='flex lg:w-1/3 gap-12 md:gap-9 mt-2 md:mt-0 mb-2 md:mb-0'>
          <SelectedLotMenu />
          <SelectedFloorMenu />
        </div>
      </div>

      <Divider className='text-blue-dark' sx={{ width: '80%', borderColor: '#3B88C3', borderWidth: '1.5px', borderRadius: '24px' }} />
      <div className="mt-6 w-3/4 md:w-1/2">
        <Stack direction="column" spacing={2.5}>
          <Grid container spacing={1} className='flex justify-center align-middle text-center text-black'>
            <Grid item xs={1.4} className='flex align-middle items-center justify-center'>
              Order
            </Grid>
            <Grid item xs={6} className='flex align-middle items-center justify-center'>
              Ratio
            </Grid>
            <Grid item xs={2.6} className='flex align-middle items-center justify-center'>
              Space
            </Grid>
            <Grid item xs className='flex align-middle items-center justify-center'>

            </Grid>
          </Grid>
          <CommonButton variant="contained" onClick={handleClickOpen} >
            <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
              <Grid item xs={1} className='flex align-middle items-center justify-center text-red'>
                1
              </Grid>
              <Grid item xs={7} className='flex align-middle items-center justify-center'>
                0%
              </Grid>
              <Grid item xs={2} className='flex align-middle items-center justify-center'>
                123
              </Grid>
              <Grid item xs className='flex align-middle items-center justify-center'>
                <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
              </Grid>
            </Grid>
          </CommonButton>
          <CommonButton variant="contained" onClick={handleClickOpen} >
            <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
              <Grid item xs={1} className='flex align-middle items-center justify-center text-red'>
                2
              </Grid>
              <Grid item xs={7} className='flex align-middle items-center justify-center'>
                10%
              </Grid>
              <Grid item xs={2} className='flex align-middle items-center justify-center'>
                12
              </Grid>
              <Grid item xs className='flex align-middle items-center justify-center'>
                <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
              </Grid>
            </Grid>
          </CommonButton>
          
        </Stack>
      </div>
      <ScrollToTopButton/>
      <UsageRatioModal
        open={open}
        onClose={() => setOpen(false)}
      // Other props //
      // Name 
      // Car Id
      // Phone Number
      // Email Address
      />
    </div>
  );
}