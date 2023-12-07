import { useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const commondivClass = "text-white bg-blue-light rounded-lg px-6 py-2 font-bold text-center flex shadow-inner text-center justify-center mr-4 md:mr-6 text-sm md:text-md";

const UsageHistoryDetail = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Space ID:", spaceId);
  }, [spaceId]);
  
  if(!spaceId){
    navigate("/guard/usagehistory");
    // toast error??
    return;
  }
  const [lot, floor, space] = spaceId.split('-');

  return (
    <div className='flex flex-col'>
      <div className="flex flex-row sm:flex-col">
        <div>
          <div className="flex justify-start mt-8 md:mt-6 ml-4 sm:ml-10">
            <button>
              <KeyboardArrowLeftRoundedIcon onClick={() => navigate("/guard/usagehistory")} sx={{
                color: 'white', background: '#214F6D', textAlign: 'center', borderRadius: '100%', fontSize: '38px', '&:hover': {
                  background: '#1A3E55',
                },
              }} />
            </button>
            <div className="hidden sm:flex text-2xl md:text-2xl text-blue-dark font-bold  align-middle items-center justify-start w-full ml-20">
              <div className="">Usage History Detail</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-4 ml-4 md:ml-0 ">
          <div className={`
        ${commondivClass} 
      `}>
            Lot {lot}
          </div>
          <div className={`
        ${commondivClass} 
      `}>
            {floor} F
          </div>
          <div className={`
        ${commondivClass} 
      `}>
            {space}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center align-middle items-center text-center mt-4">
        <div className="mt-4 w-5/6 sm:w-1/2 ">
          <Stack direction="column" spacing={2} >
            <Grid container spacing={0} className='justify-center align-middle text-center text-black'>
              <div className="flex w-full">
                <Grid item className='flex align-middle items-center justify-start w-2/5'>
                  <div className="w-full">
                    <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                      fontFamily="lexend" color="#214F6D" fontWeight={700} >
                      Car ID
                    </Typography>
                    <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>A1234567890</div>
                  </div>
                </Grid>
                <Grid item className='flex align-middle items-center justify-center w-3/5'>
                  <div className="w-full ml-2">
                    <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                      fontFamily="lexend" color="#214F6D" fontWeight={700} >
                      Duration
                    </Typography>
                    <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>11:00 AM - 8:00 PM</div>
                  </div>
                </Grid>           
              </div>
            </Grid>
            <Divider className='text-blue-dark' sx={{ width: '100%', borderColor: '#3B88C3', borderWidth: '1px', borderRadius: '24px'}} />  
            <Grid container spacing={0} className='justify-center align-middle text-center text-black'>
              <div className="flex w-full">
                <Grid item className='flex align-middle items-center justify-start w-2/5'>
                  <div className="w-full">
                    <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                      fontFamily="lexend" color="#214F6D" fontWeight={700}>
                      Car ID
                    </Typography>
                    <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>A1234567890</div>
                  </div>
                </Grid>
                <Grid item className='flex align-middle items-center justify-center w-3/5'>
                  <div className="w-full ml-2">
                    <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                      fontFamily="lexend" color="#214F6D" fontWeight={700}>
                      Duration
                    </Typography>
                    <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>11:00 AM - 8:00 PM</div>
                  </div>
                </Grid>
              </div>
            </Grid>
          </Stack>
        </div>
      </div>      
    </div>
  );
};

export default UsageHistoryDetail;
