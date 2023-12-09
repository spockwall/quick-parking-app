import SettingsLotMenu from "./SettingsLotMenu";
import SettingsFloorMenu from "./SettingsFloorMenu";

export default function Settings(): JSX.Element {
    return (
        <div className="flex justify-center mt-32 sm:mt-20">
            <div className="w-3/5 md:w-2/5 lg:w-1/3 flex flex-col justify-center items-center">
                <div className="w-full">
                    <div className="mb-2 text-lg md:text-2xl text-blue-dark font-bold">Parking Lot</div>
                    <SettingsLotMenu />
                </div>
                <div className="w-full mt-16">
                    <div className="mb-2 text-lg md:text-2xl  text-blue-dark font-bold">Parking Floor</div>
                    <SettingsFloorMenu />
                </div>
            </div>
        </div>
    );
}
