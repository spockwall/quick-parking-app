import { Modal } from "flowbite-react";
import type { ParkingSpaceStatus } from "../../types";


type statusModalProps = {
  status?: ParkingSpaceStatus;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function statusModal(props: statusModalProps) {
  const status = props.status;
  const { openModal, setOpenModal } = props;
  return (
    <div>
      <Modal size="sm" dismissible show={openModal} onClose={() => setOpenModal(false)} className="bg-blue-light">
        <Modal.Header>Parking Space Information</Modal.Header>
        <Modal.Body>
          <table className="w-full text-gray-700 m-auto border-spacing-8">
            <tbody>
              {Object.keys(status ?? {}).map((val, i) => (
                <tr key={i}>
                  <td className="w-1/4 text-right">{val.toUpperCase()}: </td>
                  <td className="w-3/4 text-center">{status?.[val as keyof ParkingSpaceStatus]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
}