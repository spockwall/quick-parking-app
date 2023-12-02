// pages/Guard/index.tsx

// import { styled } from '@mui/material/styles';
import ParkingLot from '../../../components/ParkingLot';
import SelectedLotMenu from '../../../components/SelectedLotMenu';
import SelectedFloorMenu from '../../../components/SelectedFloorMenu';


// import Button from '@mui/material/Button';


// const CommonButton = styled(Button)`
//   text-transform: none;
//   font-size: 16px;
//   padding: 10px 15px;
//   border: 2px solid;
//   border-radius: 12px;
//   background-color: #ffffff;
//   border-color: #3B88C3;
//   &:hover {
//     border-color: blue-dark;
//     background-color: #ffffff;
//     box-shadow: 0 0 0 0.1rem #3B88C3;
//   }
//   &:focus {
//     box-shadow: 0 0 0 0.2rem #3B88C3;
//   }
//   font-family: 'Lexend', sans-serif;
// `;


export default function CurrentStatus() {
  // const navigate = useNavigate();
  return(
    <div className='flex flex-col items-center justify-start'>
      <div className="mt-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
        <div className="hidden sm:flex">Current Status</div>
        <div className='flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-2 md:mb-0'>
          <SelectedLotMenu />
          <SelectedFloorMenu />
        </div>
      </div>
      {/* <Divider className='text-blue-dark' sx={{ width: '80%', borderColor: '#3B88C3', borderWidth: '1.5px', borderRadius: '24px' }} /> */}
      <div className='flex w-full max-h-full mt-2  justify-center'>
        < ParkingLot floor={1} slot={1} modal={true} carlicense={null} usagehistory={false} />
      </div>
    </div>
  ) 
}

