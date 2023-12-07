import { useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from "react-router-dom";


import ParkingLot from '../../../components/ParkingLot';

const commondivClass = "text-white bg-blue-light rounded-lg px-6 py-2 font-bold text-center flex shadow-inner text-center justify-center h-3/5 mr-4 md:mr-6 text-sm md:text-md text-center";

const OccupiedDetail = () => {
  const { carlicense } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data based on spaceId 
    console.log("Car License:", carlicense);
  }, [carlicense]);

  return (
    <div className='flex flex-col'>
      <div className="flex items-center">
        <div>
          <div className="flex justify-start mt-6 ml-10 md:ml-32 lg:ml-40">
            <button>
              <KeyboardArrowLeftRoundedIcon onClick={() => navigate("/staff/occupied")} sx={{
                color: 'white', background: '#214F6D', textAlign: 'center', borderRadius: '100%', fontSize: '32px', '&:hover': {
                  background: '#1A3E55',
                },
              }} />
            </button>
            {/* <div className="hidden sm:flex text-2xl md:text-2xl text-blue-dark font-bold  align-middle items-center justify-start w-full mb-2 ml-20">
              <div className="">Usage History Detail</div>
            </div> */}
          </div>
        </div>

        <div className="flex justify-center mt-6 ml-4 md:ml-20 lg:ml-32">
          <div className={`
        ${commondivClass} 
      `}>
            Lot 1
          </div>
          <div className={`
        ${commondivClass}  
      `}>
            1 F
          </div>
          <div className={`
        ${commondivClass} 
      `}>
            1
          </div>
        </div>
      </div>

      <div className="flex justify-center align-middle items-center text-center mt-6 sm:mt-2 w-full">
        <div className='flex w-full max-h-full mt-2  justify-center'>
          < ParkingLot floor={1} slot={1} modal={false} carlicense={carlicense} usagehistory={false}/>
        </div>
      </div>
    </div>
  );
};

export default OccupiedDetail;
