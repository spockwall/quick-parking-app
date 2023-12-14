import SelectMenu from "../../../components/SelectMenu";
import ParkingLot from "../../../components/ParkingLot";
import { floors, slots } from "../../../data/parkingSlots";

export default function UsageHistory() {
    // TODO: State change when select menu changes
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="mt-5 md:mb-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                <div className="hidden sm:flex">Usage History</div>
                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-1 md:mb-0">
                    <SelectMenu options={slots} />
                    <SelectMenu options={floors} />
                </div>
            </div>
            <div className="flex w-full sm:max-h-96  justify-center">
                <ParkingLot floor={1} slot={1} modal={false} carlicense={null} usagehistory={true} />
            </div>
        </div>
    );
}
