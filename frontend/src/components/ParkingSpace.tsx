import car from "../assets/car.svg";
import wheelchair from "../assets/wheelchair.svg"
import mapSignTrans from "../utils/mapSignTrans";

type ParkingSpacePropsType = {
  serial: number;
  occupied: boolean;
  onClick: () => void;
  type: string;
  carlicense: boolean;
  hover: boolean;
};
export default function ParkingSpace(props: ParkingSpacePropsType): JSX.Element {
  const { serial, occupied, type, carlicense, hover } = props;
  const onClick = props.onClick;

  return serial <= 0 ? (
    <div className="p-1 w-12 h-8 text-center text-slate-700 font-bold">{mapSignTrans(serial)}</div>
  ) : (
    <>
      
      <div className="text-center">{serial}</div>
        {
          hover ? (
            <button className={`w-20 h-10 border-2 border-blue-dark rounded-md flex items-center justify-center hover:bg-yellow`} onClick={onClick}>
              {occupied && <img src={car} className="w-12 -mt-2 -mb-2" alt="Car"></img>}
              {(type === 'disabledOnly') && <img src={wheelchair} className="-mt-2 -mb-2" alt="Wheelchair"></img>}
            </button>
          ) : (
              <div className={`w-20 h-10 border-2 border-blue-dark rounded-md flex items-center justify-center ${carlicense ? 'bg-yellow' : ''}`}>
              {occupied && <img src={car} className="w-12 -mt-2 -mb-2" alt="Car"></img>}
              {(type === 'disabledOnly') && <img src={wheelchair} className="-mt-2 -mb-2" alt="Wheelchair"></img>}
            </div>
          )
        }

    </>
  );
}