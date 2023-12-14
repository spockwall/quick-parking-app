// import { useState } from "react";

import SelectedLotMenu from '../../../components/SelectedLotMenu';
import SelectedFloorMenu from '../../../components/SelectedFloorMenu';
// import { useNavigate } from "react-router-dom";


import ParkingLot from '../../../components/ParkingLot';

// const commonButtonClass = "text-white bg-blue-dark hover:bg-blue-exdark focus:outline-none focus:ring-2 focus:ring-blue-exdark rounded-full text-md px-5 py-2.5 text-center me-2 mt-6 flex";

export default function UsageHistory() {

  return (
    <div className='flex flex-col items-center justify-start'>
      <div className="mt-5 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
        <div className="hidden sm:flex">Usage History</div>
        <div className='flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-1 md:mb-0'>
          <SelectedLotMenu />
          <SelectedFloorMenu />
        </div>
      </div>
      <div className='flex w-full sm:max-h-96  justify-center'>
        < ParkingLot floor={1} slot={1} modal={false} carlicense={null} usagehistory={true} />
      </div>
      {/* <button type="button" onClick={handleClick} className={`
        ${commonButtonClass} 
      `}>
        <span className="mr-1 text-sm md:text-md text-center ">Check History</span>
      </button> */}

    </div>
  );
}