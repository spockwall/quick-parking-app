import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { UsageHistoryData } from "../../../data/fakeData";
import { commonDivClass2 } from "../../../styles/commonStyles";
import useParkingSpaceHistory from "../../../hooks/useParkingSpaceHistory";


interface TitleGridProps {
    title: string;
    value: string;
    width: number;
}
function TitledGrid(props: TitleGridProps) {
    return (
        <Grid item className={`flex align-middle items-center justify-center w-${props.width}/5`}>
            <div className="w-full ml-1">
                <Typography
                    id="transition-modal-description"
                    sx={{ textAlign: "start", marginBottom: "4px" }}
                    fontFamily="lexend"
                    color="#214F6D"
                    fontWeight={700}
                >
                    {props.title}
                </Typography>
                <div className="text-sm md:text-lg text-start border-2 border-blue-dark mt-2 rounded p-2">
                    {props.value}
                </div>
            </div>
        </Grid>
    );
}

const UsageHistoryDetail = () => {
    // TODO: there is no api for this page.
    const { spaceId } = useParams<{ spaceId: string }>();
    const navigate = useNavigate();
    const UsageHistoryData = useParkingSpaceHistory(spaceId || "");

    useEffect(() => {
        console.log("Space ID:", spaceId);
    }, [spaceId]);

    if (!spaceId) {
        navigate("/guard/usagehistory");
        // toast error??
        return;
    }
    const [lot, floor, space] = spaceId.split("-");

    return (
        <div className="flex flex-col">
            <div className="flex flex-row sm:flex-col">
                <div>
                    <div className="flex justify-start mt-8 md:mt-6 ml-4 sm:ml-10">
                        <button>
                            <KeyboardArrowLeftRoundedIcon
                                onClick={() => navigate("/guard/usagehistory")}
                                sx={{
                                    color: "white",
                                    background: "#214F6D",
                                    textAlign: "center",
                                    borderRadius: "100%",
                                    fontSize: "38px",
                                    "&:hover": {
                                        background: "#1A3E55",
                                    },
                                }}
                            />
                        </button>
                        <div className="hidden sm:flex text-2xl md:text-2xl text-blue-dark font-bold  align-middle items-center justify-start w-full ml-20">
                            <div className="">Usage History Detail</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 sm:mt-4 ml-4 md:ml-0 ">
                    <div className={`${commonDivClass2}`}>Lot {lot}</div>
                    <div className={`${commonDivClass2}`}>{floor} F</div>
                    <div className={`${commonDivClass2}`}>{space}</div>
                </div>
            </div>

            <div className="flex justify-center align-middle items-center text-center mt-4">
                <div className="mt-4 w-5/6 sm:w-1/2 ">
                    <Stack direction="column" spacing={2}>
                        {UsageHistoryData.map((data, index) => {
                            return (
                                <div key={index}>
                                    <Grid
                                        container
                                        spacing={0}
                                        className="justify-center align-middle text-center text-black"
                                        key={index}
                                    >
                                        <div className="flex w-full" key={index}>
                                            <TitledGrid title="Car ID" value={data.carId} width={2} />
                                            <TitledGrid title="Duration" value={data.period} width={3} />
                                        </div>
                                    </Grid>
                                    <Divider
                                        className="text-blue-dark"
                                        sx={{
                                            width: "100%",
                                            borderColor: "#3B88C3",
                                            borderWidth: "1px",
                                            borderRadius: "24px",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default UsageHistoryDetail;
