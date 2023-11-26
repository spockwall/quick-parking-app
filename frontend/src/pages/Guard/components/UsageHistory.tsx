// import { useState } from "react";

import SelectedLotMenu from './SelectedLotMenu';
import SelectedFloorMenu from './SelectedFloorMenu';

import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";

const commonButtonClass = "text-white bg-blue-dark hover:bg-blue-exdark focus:outline-none focus:ring-2 focus:ring-blue-exdark rounded-full text-md px-5 py-2.5 text-center me-2 m-4 flex";

export default function UsageHistory() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/guard/usagehistory/[spaceID]");
  };

  return (
    <div className='flex flex-col items-center justify-start' style={{ height: '88vh' }}>
      <div className="mt-8 md:mt-6 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col md:flex-row md:justify-around align-middle items-center w-4/5">
        <div className="hidden sm:flex">Usage History</div>
        <div className='flex md:w-1/3 gap-12 md:gap-9 mt-2 md:mt-0 mb-2 md:mb-0'>
          <SelectedLotMenu />
          <SelectedFloorMenu />
        </div>
      </div>
      <Divider className='text-blue-dark' sx={{ width: '80%', borderColor: '#3B88C3', borderWidth: '1.5px', borderRadius: '24px' }} />
      <div>

      </div>
      <button type="button" onClick={handleClick} className={`
        ${commonButtonClass}
      `}>
        <span className="mr-1 text-sm md:text-md text-center ">Check History</span>
      </button>
      
    </div>
  );
}