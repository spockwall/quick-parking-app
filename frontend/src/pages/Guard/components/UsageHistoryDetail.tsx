// usagehistorydetail.tsx

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const commondivClass = "text-white bg-blue-light rounded-lg text-md px-6 py-2 font-bold text-center flex shadow-inner text-center justify-center";

const UsageHistoryDetail = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data based on spaceId 
    console.log("Space ID:", spaceId);
  }, [spaceId]);

  return (
    <div className='flex flex-col' style={{ height: '88vh' }}>
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
            <div className="hidden sm:flex text-2xl md:text-2xl text-blue-dark font-bold  align-middle items-center justify-start w-full mb-2 ml-20">
              <div className="">Usage History Detail</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:mt-4 ml-4 md:ml-0">
          <div className={`
        ${commondivClass} mr-4 md:mr-10 text-sm md:text-md text-center 
      `}>
            Lot 1
          </div>
          <div className={`
        ${commondivClass} mr-4 md:mr-10 text-sm md:text-md text-center 
      `}>
            1 F
          </div>
          <div className={`
        ${commondivClass} text-sm md:text-md text-center 
      `}>
            1
          </div>
        </div>
      </div>
      
      <div className="flex justify-center text-center mt-4">
        <div className="mt-4 w-5/6 sm:w-1/2">
          <Stack direction="column" spacing={5} >
            <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
              <Grid item xs={5} className='flex align-middle items-center justify-start'>
                <div className="w-full">
                  <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                  fontFamily="lexend" color="#214F6D" >
                    Car ID
                  </Typography>
                  <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>A1234567890</div>
                </div>          
                
              </Grid>
              <Grid item xs={7} className='flex align-middle items-center justify-center'>
                <div className="w-full ml-2">
                  <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                    fontFamily="lexend" color="#214F6D" >
                    Duration
                  </Typography>
                  <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>11:00 AM - 8:00 PM</div>
                </div>  
              </Grid>
            </Grid>
            <Grid container spacing={0} className='flex justify-center align-middle text-center text-black'>
              <Grid item xs={5} className='flex align-middle items-center justify-start'>
                <div className="w-full">
                  <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                  fontFamily="lexend" color="#214F6D" >
                    Car ID
                  </Typography>
                  <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>B1234567890</div>
                </div>          
                
              </Grid>
              <Grid item xs={7} className='flex align-middle items-center justify-center'>
                <div className="w-full ml-2">
                  <Typography id="transition-modal-description" sx={{ textAlign: 'start', marginBottom: '4px' }}
                    fontFamily="lexend" color="#214F6D" >
                    Duration
                  </Typography>
                  <div className='text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2'>9:00 PM - 12:00 PM </div>
                </div>  
              </Grid>
            </Grid>
          </Stack>
        </div>
      </div>      
    </div>
  );
};

export default UsageHistoryDetail;
