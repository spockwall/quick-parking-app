import car from "../assets/car.svg";
import wheelchair from "../assets/wheelchair.svg";
import priority from "../assets/priority.svg";
import mapSignTrans from "../utils/mapSignTrans";

type ParkingSpacePropsType = {
    serial: number;
    occupied: boolean;
    type: string;
    carlicense: boolean;
    hover: boolean;
    onClick: () => void;
};
export default function ParkingSpace(props: ParkingSpacePropsType): JSX.Element {
    const { serial, occupied, type} = props; // fix: hover deprecated
    const wheelchairImg = <img src={wheelchair} className="-mt-2 -mb-2" alt="Wheelchair"></img>;
    const priorityImg = <img src={priority} className="-mt-2 -mb-2" alt="priority"></img>;
    const carImg = <img src={car} className="w-12 -mt-2 -mb-2" alt="Car"></img>;

    return serial <= 0 ? (
        <div className="p-1 w-12 h-8 text-center text-slate-700 font-bold">
          {mapSignTrans(serial)}
        </div>
    ) : (
        <>
            <div className="text-center">{serial}</div>
            <button
                className={`w-20 h-10 border-2 border-blue-dark rounded-md flex items-center justify-center`}
                onClick={props.onClick}
            >
                {occupied && carImg}
                {type === "disability" && wheelchairImg}
                {type === "difficulty" && priorityImg}
            </button>
        </>
    );
}
