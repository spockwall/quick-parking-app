import ParkingSpace from "./ParkingSpace";
import useParkingLotMap from "../hooks/useParkingLotMap";
import useParkingLotStatus from "../hooks/useParkingLotStatus";
import StatusModal from "./modals/StatusModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingSpaceState } from "../enums";
import type { parkingSpaceStatus } from "../types";

type ParkingLotPropsType = {
    floor: number;
    slot: number;
    modal: boolean;
    carlicense?: string | null;
    usagehistory: boolean;
};

export default function ParkingLot(props: ParkingLotPropsType): JSX.Element {
    const navigate = useNavigate();

    const { floor, slot, carlicense, usagehistory } = props;
    // console.log(carlicense)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [status, setStatus] = useState<parkingSpaceStatus>();

    const map = useParkingLotMap(floor, slot);
    const statusList = useParkingLotStatus(floor, slot);

    const carlicenseValue: string = carlicense || "";
    const handleParkingSpaceClick = (currentStatus: parkingSpaceStatus) => {
        setOpenModal(true);
        setStatus(currentStatus);
        if (usagehistory) {
            navigate(`/guard/usagehistory/${currentStatus.spaceId}`);
        }
    };

    return (
        <>
            {openModal && <StatusModal status={status} openModal={openModal} onClose={() => setOpenModal(false)}></StatusModal>}

            <div className="border-2 border-blue-dark w-10/12 md:w-8/12 text-center mt-2 rounded-lg overflow-y-auto">
                <table className="m-auto">
                    <tbody className="w-full h-5 overflow-y-auto">
                        {map?.map((row, i) => (
                            <tr key={i}>
                                {row.map((col, j) => {
                                    const currentStatus = statusList[col - 1];
                                    const curState = currentStatus?.state;
                                    const curType = currentStatus?.status;

                                    return (
                                        <td key={j}>
                                            <ParkingSpace
                                                serial={col}
                                                occupied={curState === ParkingSpaceState.OCCUPIED}
                                                type={curType}
                                                onClick={() => {
                                                    handleParkingSpaceClick(currentStatus);
                                                }}
                                                carlicense={carlicenseValue}
                                                hover={false}
                                            ></ParkingSpace>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
