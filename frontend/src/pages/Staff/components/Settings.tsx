import SelectMenu from "../../../components/SelectMenu";
import { floors, slots } from "../../../data/parkingSlots";
import { useState } from "react";

export default function Settings(): JSX.Element {
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
    return (
        <div className="flex justify-center mt-32 sm:mt-20">
            <div className="w-3/5 md:w-2/5 lg:w-1/3 flex flex-col justify-center items-center">
                <div className="w-full">
                    <div className="mb-2 text-lg md:text-2xl text-blue-dark font-bold">Parking Lot</div>
                    <SelectMenu options={slots} 
                        selectedIndex={selectedSlotIndex}
                        onSelectedIndexChanged={setSelectedSlotIndex}
                        style="blue" />
                </div>
                <div className="w-full mt-16">
                    <div className="mb-2 text-lg md:text-2xl  text-blue-dark font-bold">Parking Floor</div>
                    <SelectMenu options={floors} 
                        selectedIndex={selectedFloorIndex}
                        onSelectedIndexChanged={setSelectedFloorIndex}
                        style="blue" />
                </div>
            </div>
        </div>
    );
}
