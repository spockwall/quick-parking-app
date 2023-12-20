import AppBar from "@mui/material/AppBar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Toolbar from "@mui/material/Toolbar";
import { commonButtonClass } from "../../../styles/commonStyles";
import { useNavigate, useLocation } from "react-router-dom";

const selectRouteText = (currentRoute?: string) => {
    switch (currentRoute) {
        case "guard":
            return "Guard";
        case "usageduration":
            return "Usage Duration";
        case "usageratio":
            return "Usage Ratio";
        case "usagehistory":
            return "Usage History";
        case "currentstatus":
            return "Current Status";
        default:
            return "History Detail";
    }
};
export default function HeaderBar() {
    const location = useLocation();
    const currentRoute = location.pathname.split("/").pop();
    const routeText = selectRouteText(currentRoute);
    const navigate = useNavigate();
    const handleClickLogout = () => {
        navigate("/logout");
    };

    return (
        <AppBar position="static">
            <Toolbar className="bg-blue-light flex justify-between">
                <div className="flex align-middle justify-center">
                    <button>
                        <img
                            className="w-12 h-20 sm:w-14 sm:h-24"
                            src="/logo.svg"
                            alt="Quick Parking"
                            onClick={() => navigate("/guard")}
                        />
                    </button>
                    <div className="flex sm:hidden text-md align-middle items-center justify-center text-start ml-1.5">
                        {routeText}
                    </div>
                    <div className="hidden sm:flex md:ml-2 flex-col align-middle justify-center">
                        <div className="text-xl ml-2 md:text-2xl text-blue-dark font-bold flex justify-start">
                            Quick Parking
                        </div>
                        <div className="mt-1 ml-2 text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">
                            Time saved daily.
                        </div>
                    </div>
                </div>

                <button type="button" onClick={handleClickLogout} className={commonButtonClass}>
                    <span className="mr-1 text-xs sm:text-md md:text-lg text-center ">Log Out</span>
                    <LogoutRoundedIcon fontSize="small" style={{ fontSize: "1.3rem" }} />
                </button>
            </Toolbar>
        </AppBar>
    );
}
