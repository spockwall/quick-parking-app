import ParkingLot from "../../../components/ParkingLot";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonDivClass } from "../../../styles/commonStyles";


const OccupiedDetail = () => {
    // const { carlicense } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState<string | null>(null);
    const [spaceId, setSpaceId] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("id");
        setId(id);
        const spaceId = searchParams.get("spaceId");
        setSpaceId(spaceId);

        console.log("Car License:", id);
        console.log("Space ID:", spaceId);
    }, [location.search]);

    if (!spaceId) {
        navigate("/guard/usagehistory");
        // toast error??
        return;
    }
    const [lot, floor, space] = spaceId.split("-");

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <div>
                    <div className="flex justify-start mt-6 ml-10 md:ml-32 lg:ml-40">
                        <button>
                            <KeyboardArrowLeftRoundedIcon
                                onClick={() => navigate("/staff/occupied")}
                                sx={{
                                    color: "white",
                                    background: "#214F6D",
                                    textAlign: "center",
                                    borderRadius: "100%",
                                    fontSize: "32px",
                                    "&:hover": {
                                        background: "#1A3E55",
                                    },
                                }}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-6 ml-4 md:ml-20 lg:ml-32">
                    <div className={`${commonDivClass}`}>Lot { lot }</div>
                    <div className={`${commonDivClass}`}>{ floor } F</div>
                    <div className={`${commonDivClass}`}>{ space }</div>
                </div>
            </div>

            <div className="flex justify-center align-middle items-center text-center mt-6 sm:mt-2 w-full">
                <div className="flex w-full max-h-full mt-2  justify-center">
                    <ParkingLot floor={parseInt(floor, 10)} slot={parseInt(lot, 10)} modal={false} carlicense={id} usagehistory={false} />
                </div>
            </div>
        </div>
    );
};

export default OccupiedDetail;
