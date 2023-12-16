import SelectMenu from "../../../components/SelectMenu";
import UsageRatioModal from "./modals/UsageRatioModal";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import useParkingSpaceRatio from "../../../hooks/UseRatioData";

import { GridItemHeader, GridItemList } from "./GridItem";
import { useState } from "react";
// import { RatioData } from "../../../data/fakeData";
import { slots, floors } from "../../../data/parkingSlots"; 
import { GuardService } from "../../../services/guardService";
import { OneWeekRatioInfo } from "../../../types";

export default function UsageRatio() {
    const [open, setOpen] = useState(false);
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
    const RatioData = useParkingSpaceRatio(selectedFloorIndex, selectedSlotIndex);
    const [ratioInfo, setRatioInfo] = useState<OneWeekRatioInfo | null>(null);

    const handleClickOpen = async (spaceId: string) => {
        const guardService = new GuardService();
        let ratios = await guardService.getVacancyRatioOneWeek(spaceId);
        if (ratios && 'message' in ratios) {
            delete ratios.message;
        }
        if (ratios && 'parkingSpaceId' in ratios) {
            delete ratios.parkingSpaceId;
        }
        if (ratios && ratios.dates && ratios.usageRatios) {
            ratios.dates = ratios?.dates.map(date => {
                const parts = date.split("-");
                return `${parts[1]}/${parts[2]}`;
            });
            ratios.usageRatios = ratios?.usageRatios.map(usageRatio => {
                return parseFloat(usageRatio.toFixed(3));
            });
        }
        setRatioInfo(ratios);
        setOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="mt-5 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                <div className="hidden sm:flex">Usage Ratio</div>
                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-2 md:mt-0 mb-2 md:mb-0">
                    <SelectMenu options={floors} 
                        selectedIndex={selectedFloorIndex}
                        onSelectedIndexChanged={setSelectedFloorIndex} />
                    <SelectMenu options={slots} 
                        selectedIndex={selectedSlotIndex}
                        onSelectedIndexChanged={setSelectedSlotIndex}/>
                </div>
            </div>

            <Divider
                className="text-blue-dark"
                sx={{ width: "80%", borderColor: "#3B88C3", borderWidth: "1.5px", borderRadius: "24px" }}
            />
            <div className="mt-6 w-3/4 md:w-1/2">
                <Stack direction="column" spacing={2.5}>
                    <GridItemHeader dataName="Ratio"></GridItemHeader>
                    {RatioData.map((data, index) => (
                        <GridItemList
                            key={data.parkingSpaceId}
                            index={index + 1}
                            data={data.usageRatio.toString()}
                            parkingSpaceId={data.parkingSpaceId}
                            onClick={() => handleClickOpen(data.parkingSpaceId)}
                        />
                    ))}
                </Stack>
            </div>
            <ScrollToTopButton />
            <UsageRatioModal
                open={open}
                onClose={() => setOpen(false)}
                // Other props //
                // Name
                // Car Id
                // Phone Number
                // Email Address
                ratioInfo={ratioInfo}
            />
        </div>
    );
}
