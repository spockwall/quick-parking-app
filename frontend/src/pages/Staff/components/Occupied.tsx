import Button from "../../../components/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../../components/CommonButton";

// api
import { useEffect, useState } from "react";
import { ParkingService } from "../../../services/parkingService";
import { userParkingStatus } from "../../../types";

import useUserInfo from "../../../hooks/useUserInfo";
import useAuth from "../../../hooks/useAuth";
import { ROLE } from "../../../enums";

function formatDuration(seconds) {
    const start = new Date(1970, 0, 1, 0, 0, 0, 0);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const secondsToNow = currentTime - Math.floor(start.getTime() / 1000);

    const secondsLeft = secondsToNow - seconds;

    const days = Math.floor(secondsLeft / (24 * 60 * 60));
    const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
    if (days > 7) {
        return `${days} d ${hours} hr`;
    } else {
        return `${days} d ${hours} hr ${minutes} m`;
    }
}

export default function Occupied(): JSX.Element {
    const navigate = useNavigate();

    // user info
    useAuth(ROLE.STAFF);
    const { userInfo } = useUserInfo();

    // get occupied status
    const [status, setStatus] = useState<userParkingStatus[]>([]);
    console.log(status);
    useEffect(() => {
        const fetchUserId = async () => {
            if (userInfo.userId) {
                const userId = userInfo.userId;
                const parkingService = new ParkingService();
                const status = await parkingService.getStaffParkingStatus(userId);
                setStatus(status ?? []);
            }
        };
        fetchUserId();
    }, [userInfo.userId]);


    return (
        <>
            {/*INFO*/}
            <div className="flex flex-col justify-center items-center text-center  mt-8 mb-2 md:mb-0 text-blue-dark font-bold">
                <div className="mb-2">
                    <span className="text-yellow underline decoration-yellow-dark text-2xl md:text-3xl mr-3">
                        {status.length}
                    </span>
                    <span className="text-lg md:text-xl ">Spaces Occupied</span>
                </div>
                <div className="mt-6 w-4/5 md:w-1/2 mb-20">
                    <Stack direction="column" spacing={2.5}>
                        <Grid container spacing={1} className="flex justify-center align-middle text-center text-black">
                            <Grid item xs={1.5} className="flex align-middle items-center justify-center">
                                Order
                            </Grid>
                            <Grid item xs={4} className="flex align-middle items-center justify-center">
                                Time
                            </Grid>
                            <Grid item xs={5.5} className="flex align-middle items-center justify-center">
                                Car License
                            </Grid>
                            <Grid item xs className="flex align-middle items-center justify-center"></Grid>
                        </Grid>
                        {status?.map((item, index) => {
                            const formattedDuration = formatDuration(item.enterTime);
                            const isWarn = formattedDuration.includes('d') && parseInt(formattedDuration.split(' ')[0], 10) > 7;
                            return (
                                <CommonButton
                                    key={index}
                                    
                                    onClick={() =>
                                        navigate(`/staff/occupied/detail/?spaceId=${item.spaceId}`)
                                    }
                                    bgcolor={
                                        isWarn ? '#E65345': undefined
                                    }
                                    bordercolor={
                                        isWarn ? '#000000' : undefined
                                    }

                                >
                                    <Grid
                                        container
                                        spacing={0}
                                        className="flex justify-center align-middle text-center text-black"
                                    >
                                        <Grid
                                            item
                                            xs={1}
                                            className={`flex align-middle items-center justify-center ${isWarn ? 'text-black' : 'text-red'}
                                    }`}
                                        >
                                            {index + 1}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className="flex align-middle items-center justify-center"
                                        >
                                            {formattedDuration}
                                        </Grid>
                                        <Grid item xs={3} className="flex align-middle items-center justify-center">
                                            {item.licensePlateNumber}
                                        </Grid>
                                        <Grid item xs className="flex align-middle items-center justify-center">
                                            <NavigateNextOutlinedIcon
                                                className="text-blue-dark"
                                                style={{ fontSize: "2rem" }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CommonButton>
                            );
                        })}
                    </Stack>
                </div>
                <Button type="button" onClick={() => navigate("/staff")}>
                    <span className="flex items-center align-middle justify-center">
                        <ArrowBackIosRoundedIcon className="pr-1 mr-1" />
                        Back
                        <span className="hidden sm:flex">&nbsp;to Parking Status</span>
                    </span>
                </Button>
            </div>
        </>
    );
}
