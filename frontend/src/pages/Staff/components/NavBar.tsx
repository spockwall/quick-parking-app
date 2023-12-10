import NavList from "./NavList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

//route
import { useNavigate, useLocation } from "react-router-dom";

const selectRouteText = (currentRoute?: string) => {
    switch (currentRoute) {
        case "profile":
            return "Personal Profile";
        case "occupied":
            return "Occupied Spaces";
        case "settings":
            return "Settings";
        default:
            return "Parking Status";
    }
};
export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname.split("/").pop();
    const routeText = selectRouteText(currentRoute);

    return (
        <>
            <AppBar position="static">
                <Toolbar className="bg-blue-light flex justify-between">
                    <div className="flex align-middle justify-center">
                        <button>
                            <img
                                className="w-12 h-20 sm:w-14 sm:h-24"
                                src="/logo.svg"
                                alt="Quick Parking"
                                onClick={() => navigate("/staff")}
                            />
                        </button>

                        <div className="hidden sm:flex md:ml-2 flex-col align-middle justify-center">
                            <div className="text-xl ml-2 md:text-2xl text-blue-dark font-bold flex justify-start">
                                Quick Parking
                            </div>
                            <div className="mt-1 ml-2 text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">
                                Time saved daily.
                            </div>
                        </div>
                        <div className="flex text-md align-middle items-center justify-center text-start ml-1.5 sm:text-2xl sm:text-blue-dark sm:ml-12 md:ml-20 lg:ml-48 font-bold">
                            {routeText}
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => navigate("/staff/occupied")}>
                            <DirectionsCarFilledOutlinedIcon
                                className="text-blue-dark mr-1"
                                style={{
                                    fontSize: "2.7rem",
                                }}
                            />
                        </button>
                        <NavList />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}
