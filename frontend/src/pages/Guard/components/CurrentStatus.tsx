import ParkingLot from "../../../components/ParkingLot";
import SelectMenu from "../../../components/SelectMenu";
import { floors, slots } from "../../../data/parkingSlots";

export default function CurrentStatus() {
    // const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="mt-2 text-2xl md:text-2xl text-blue-dark font-bold flex flex-col sm:flex-row sm:justify-around align-middle items-center w-4/5">
                <div className="hidden sm:flex">Current Status</div>
                <div className="flex lg:w-1/3 gap-12 md:gap-9 mt-0 sm:mt-1 md:mt-0 mb-2 md:mb-0">
                    <SelectMenu options={floors} />
                    <SelectMenu options={slots} />
                </div>
            </div>

            <div className="flex w-full max-h-full mt-2  justify-center">
                <ParkingLot floor={1} slot={1} modal={true} carlicense={null} usagehistory={false} />
            </div>
        </div>
    );
}
