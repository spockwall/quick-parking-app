import { Outlet, useRoutes, useMatch } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Occupied from "./components/Occupied";
import OccupiedDetail from "./components/OccupiedDetail";
import ParkingLot from "../../components/ParkingLot";

import SelectedLotMenu from "../../components/SelectedLotMenu";
import SelectedFloorMenu from "../../components/SelectedFloorMenu";

const Staff = () => {
    useAuth("staff");
    
    const isStaffRoute = useMatch("/staff");
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <div className="">
                    <NavBar />
                    {isStaffRoute && (
                        <div className="flex flex-col items-center justify-start">
                            <div className="mt-5 text-2xl  text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-1 md:mb-0"></div>
                            </div>
                            <div
                                className="flex flex-col sm:flex-row md:mb-1 text-2xl md:text-2xl text-blue-dark font-bold
              justify-center sm:justify-around align-middle items-center w-4/5 sm:mb-2"
                            >
                                <div className="flex gap-2">
                                    <SelectedLotMenu />
                                    <SelectedFloorMenu />
                                </div>
                                <div className="flex flex-col justify-center items-center sm:flex-row gap-1 sm:gap-5 text-center sm:ml-1">
                                    <div>
                                        <span className="text-yellow underline decoration-yellow-dark text-sm md:text-xl lg:text-2xl mr-1">
                                            6
                                        </span>
                                        <span className="text-xs md:text-md lg:text-lg">Spaces Available</span>
                                    </div>
                                    <div>
                                        <span className="text-blue underline decoration-blue-dark text-sm md:text-xl lg:text-2xl mr-1">
                                            2
                                        </span>
                                        <span className="text-xs md:text-md lg:text-lg">
                                            Accessible Spaces Available
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full max-h-full mt-2  justify-center">
                                <ParkingLot floor={1} slot={1} modal={false} carlicense={null} usagehistory={false} />
                            </div>
                        </div>
                    )}
                    <Outlet />
                </div>
            ),
            children: [
                { path: "profile", element: <Profile /> },
                { path: "settings", element: <Settings /> },
                { path: "occupied", element: <Occupied /> },
                { path: "occupied/:carlisence", element: <OccupiedDetail /> },
            ],
        },
    ]);
    return routes;
};

export default Staff;
