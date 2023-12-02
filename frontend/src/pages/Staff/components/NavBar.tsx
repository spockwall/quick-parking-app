// import car from "../../../assets/car.svg";
// import { useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NavList from "./NavList";

//route
import { useNavigate, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';


export default function NavBar() {
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  // const handleClickLogout = () => {
  //   navigate("/logout");
  // };
  const location = useLocation();
  const currentRoute = location.pathname.split('/').pop();
  let routeText;
  switch (currentRoute) {
    case 'profile':
      routeText = 'Personal Profile';
      break;
    case 'occupied':
      routeText = 'Occupied Spaces';
      break;
    case 'settings':
      routeText = 'Settings';
      break;
    default:
      routeText = 'Parking Status';
  }

  return (
    <>
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
              <img className="w-12 h-20 sm:w-14 sm:h-24" src="/logo.svg" alt="Quick Parking" onClick={() => navigate("/staff")} />
            </button>
           
            <div className="hidden sm:flex md:ml-2 flex-col align-middle justify-center">
              <div className="text-xl ml-2 md:text-2xl text-blue-dark font-bold flex justify-start">Quick Parking</div>
              <div className="mt-1 ml-2 text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">Time saved daily.</div>
            </div>
            <div className="flex text-md align-middle items-center justify-center text-start ml-1.5 sm:text-2xl sm:text-blue-dark sm:ml-12 md:ml-20 lg:ml-48 font-bold">
              {routeText}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={() => navigate("/staff/occupied")}>
              <DirectionsCarFilledOutlinedIcon className='text-blue-dark mr-1' style={{
                fontSize: '2.7rem'
              }} />
            </button>            
            <NavList />
          </div>          
          

          {/* <button type="button" onClick={handleClickLogout} className={`
        ${commonButtonClass}
      `}>
          <span className="mr-1 text-xs sm:text-md md:text-lg text-center ">Log Out</span>          
          <LogoutRoundedIcon fontSize="small" style={{ fontSize: "1.3rem" }} />
        </button> */}
          {/* <button
            className="w-12"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <MenuRoundedIcon sx={{ fontSize: 24 }} />
          </button> */}
          
        </Toolbar>
      </AppBar>
    </>    
  );
}