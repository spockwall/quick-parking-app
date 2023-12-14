import ParkingLot from "../../../components/ParkingLot";
import SelectMenu from "../../../components/SelectMenu";
import { floors, slots } from "../../../data/parkingSlots";
import { useState } from "react";

export default function CurrentStatus() {
    // TODO: State change when select menu changes
    // const navigate = useNavigate();
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="mt-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                <div className="hidden sm:flex">Current Status</div>
                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-2 md:mb-0">
                    <SelectMenu options={floors} 
                        selectedIndex={selectedFloorIndex}
                        onSelectedIndexChanged={setSelectedFloorIndex} />
                    <SelectMenu options={slots} 
                        selectedIndex={selectedSlotIndex}
                        onSelectedIndexChanged={setSelectedSlotIndex}/>
                </div>
            </div>

            <div className="flex w-full max-h-full mt-2  justify-center">
                <ParkingLot floor={selectedFloorIndex} slot={selectedSlotIndex} modal={true} carlicense={null} usagehistory={false} />
            </div>
        </div>
    );
}
