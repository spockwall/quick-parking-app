import ParkingSpace from "./ParkingSpace";
import useParkingLotMap from "../hooks/useParkingLotMap";
import useParkingLotStatus from "../hooks/useParkingLotStatus";
import { useState } from "react";
import type { ParkingSpaceStatus } from "../types";
import StatusModal from "./modals/StatusModal";
import { useNavigate } from "react-router-dom";

type ParkingLotPropsType = {
  floor: number;
  slot: number;
  modal: boolean;
  carlicense?: string | null;
  usagehistory: boolean;
};
enum ParkingSpaceState {
  OCCUPIED = "occupied",
  AVAILABLE = "available",
  ERROR = "error",
}

export default function ParkingLot(props: ParkingLotPropsType): JSX.Element {
  const navigate = useNavigate();

  const { floor, slot, modal, carlicense, usagehistory } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState<ParkingSpaceStatus>();

  const map = useParkingLotMap(floor, slot);
  const statusList = useParkingLotStatus(floor, slot);

  const handleParkingSpaceClick = (currentStatus: ParkingSpaceStatus) => {
    setOpenModal(true);
    setStatus(currentStatus);
    if (usagehistory) {
      navigate(`/guard/usagehistory/${currentStatus.spaceId}`);
    }
  };

  return (
    <>
      {modal && (<StatusModal status={status} openModal={openModal} onClose={() => setOpenModal(false)}></StatusModal>)}

      <div className="border-2 border-blue-dark w-10/12 md:w-8/12 text-center mt-2 rounded-lg overflow-y-auto">
        <table className="m-auto">
          <tbody className="w-full h-5 overflow-y-auto">
            {map?.map((row, i) => (
              <tr key={i}>
                {row.map((col, j) => {
                  const currentStatus = statusList[col - 1];
                  const curState = currentStatus?.state;
                  const curType = currentStatus?.type;
                  return (
                    <td key={j}>
                      <ParkingSpace
                        serial={col}
                        occupied={curState === ParkingSpaceState.OCCUPIED}
                        type={curType}
                        onClick={() => handleParkingSpaceClick(currentStatus)}
                        carlicense={carlicense === currentStatus?.id}
                        hover={usagehistory || modal}
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