import AppBar from "@mui/material/AppBar";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Toolbar from "@mui/material/Toolbar";

// import MenuIcon from "@mui/icons-material/Menu";
// import IconButton from "@mui/material/IconButton";

import { useNavigate, useLocation } from "react-router-dom";

const commonButtonClass = "text-white bg-blue-dark hover:bg-blue-exdark focus:outline-none focus:ring-2 focus:ring-blue-exdark rounded-full text-sm md:text-lg px-3 md:px-5 py-2.5 text-center flex";

export default function HeaderBar() { 

  const navigate = useNavigate();
  const handleClickLogout = () => {
    navigate("/logout");
  };

  const location = useLocation();
  const currentRoute = location.pathname.split('/').pop();

  let routeText;

  switch (currentRoute) {
    case 'guard':
      routeText = 'Guard';
      break;
    case 'usageduration':
      routeText = 'Usage Duration';
      break;
    case 'usageratio':
      routeText = 'Usage Ratio';
      break;
    case 'usagehistory':
      routeText = 'Usage History';
      break;
    default:
      routeText = 'History Detail'; 
  }


  return (
    
    <AppBar position="static">
      <Toolbar className="bg-blue-light flex justify-between">
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <div className="flex align-middle justify-center">
          <button>
            <img className="w-12 h-20 md:w-18 md:h-26" src="/logo.svg" alt="Quick Parking" onClick={() => navigate("/guard")} />
          </button>
          <div className="flex sm:hidden text-md align-middle items-center justify-center text-start ml-1.5">
            {routeText}
          </div>          
          <div className="hidden sm:flex md:ml-4 flex-col align-middle justify-center">
            <div className="text-lg ml-2 md:text-xl text-blue-dark font-bold flex justify-start">Quick Parking</div>
            <div className="mt-1 ml-2 text-sm md:text-md text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">Time saved daily.</div>
          </div>
        </div>        
        
        <button type="button" onClick={handleClickLogout} className={`
        ${commonButtonClass}
      `}>
          <span className="mr-1 text-sm md:text-md text-center ">Log Out</span>          
          <LogoutRoundedIcon fontSize="small" className="text-xs md:text-sm" />
        </button>
      </Toolbar>
    </AppBar>
  );
}