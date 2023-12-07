import Button from "../../../components/Button";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import MUIButton from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';


const CommonButton = styled(MUIButton)`
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


export default function Occupied(): JSX.Element {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/staff/occupied/[carlisence]");
  };

  return (
    <>
      {/*Title*/}
      {/* <div className="m-auto w-fit mt-4 mb-2">
        <h1 className="text-blue-dark text-2xl font-bold">Occupied</h1>
      </div> */}
      {/*INFO*/}
      <div className='flex flex-col justify-center items-center text-center  mt-8 mb-2 md:mb-0 text-blue-dark font-bold'>
        <div className="mb-2">
          <span className='text-yellow underline decoration-yellow-dark text-2xl md:text-3xl mr-3'>2
          </span>
          <span className='text-lg md:text-xl '>
            Spaces Occupied
          </span>
        </div>
        <div className="mt-6 w-4/5 md:w-1/2 mb-20">
          <Stack direction="column" spacing={2.5}>
            <Grid container spacing={1} className='flex justify-center align-middle text-center text-black'>
              <Grid item xs={1.5} className='flex align-middle items-center justify-center'>
                Order
              </Grid>
              <Grid item xs={3} className='flex align-middle items-center justify-center'>
                Time
              </Grid>
              <Grid item xs={5} className='flex align-middle items-center justify-center'>
                Car License
              </Grid>
              <Grid item xs className='flex align-middle items-center justify-center'>

              </Grid>
            </Grid>
            <CommonButton onClick={handleClick}>
              <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
                <Grid item xs={1} className='flex align-middle items-center justify-center text-red'>
                  1
                </Grid>
                <Grid item xs={4} className='flex align-middle items-center justify-center text-center'>
                  12:30
                </Grid>
                <Grid item xs={5} className='flex align-middle items-center justify-center'>
                  KA01BQ3232
                </Grid>
                <Grid item xs className='flex align-middle items-center justify-center'>
                  <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                </Grid>
              </Grid>
            </CommonButton>
            <CommonButton onClick={handleClick}>
              <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
                <Grid item xs={1} className='flex align-middle items-center justify-center text-red'>
                  2
                </Grid>
                <Grid item xs={4} className='flex align-middle items-center justify-center'>
                  10:20
                </Grid>
                <Grid item xs={5} className='flex align-middle items-center justify-center'>
                  K9999999999
                </Grid>
                <Grid item xs className='flex align-middle items-center justify-center'>
                  <NavigateNextOutlinedIcon className='text-blue-dark' style={{ fontSize: "2rem" }} />
                </Grid>
              </Grid>
            </CommonButton>
          </Stack>
        </div>
        <Button type="button" onClick={() => navigate('/staff')}>
          <span className="flex items-center align-middle justify-center">
            <ArrowBackIosRoundedIcon  className="pr-1 mr-1"/>
            Back
            <span className="hidden sm:flex">&nbsp;to Parking Status</span>
          </span>
        </Button>
      </div>
    </>
  );
}