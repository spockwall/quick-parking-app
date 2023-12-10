import SelectMenu from "../../../components/SelectMenu";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import UsageDurationModal from "./modals/UsageDurationModal";

import { useState } from "react";
import { slots, floors } from "../../../data/parkingSlots";
import { GridItem, GridItemList } from "./GridItem";
const DurationData = [
    {
        parkingSpaceId: "1-1-1",
        state: "occupied", //available | occupied | error,
        type: "general", // general | disabledOnly,
        startTime: 1700000000,
        duration: 3600,
    },
    {
        parkingSpaceId: "1-1-2",
        state: "occupied", //available | occupied | error,
        type: "general", // general | disabledOnly,
        startTime: 1700000120,
        duration: 3600,
    },
];

export default function UsageDuration() {
    // TODO: Fetch data from backend
    // TODO: Show correct data in modal
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="mt-5 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                <div className="hidden sm:flex">Usage Duration</div>
                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-2 md:mb-0">
                    <SelectMenu options={slots} />
                    <SelectMenu options={floors} />
                </div>
            </div>

            <Divider
                className="text-blue-dark"
                sx={{ width: "80%", borderColor: "#3B88C3", borderWidth: "1.5px", borderRadius: "24px" }}
            />
            <div className="mt-6 w-3/4 md:w-1/2 sm:max-h-80">
                <Stack direction="column" spacing={2.5}>
                    <Grid container spacing={1} className="flex justify-start align-middle text-center text-black">
                        <GridItem xs={1.4}>Order</GridItem>
                        <GridItem xs={6}>Space ID</GridItem>
                        <GridItem xs={2.6}>Duration</GridItem>
                    </Grid>
                    {DurationData.map((data, index) => (
                        <GridItemList
                            key={data.parkingSpaceId}
                            index={index + 1}
                            data={data.duration.toString()}
                            parkingSpaceId={data.parkingSpaceId}
                            onClick={handleClickOpen}
                        />
                    ))}
                </Stack>
            </div>
            <ScrollToTopButton />
            <UsageDurationModal
                open={open}
                onClose={() => setOpen(false)}
                // Other props //
                // Name
                // Car Id
                // Phone Number
                // Email Address
            />
        </div>
    );
}
