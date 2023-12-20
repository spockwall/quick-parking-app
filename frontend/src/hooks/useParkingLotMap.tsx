import { useEffect, useState } from "react";
import { ParkingService } from "../services/parkingService";

export default function useParkingLotMap(floor: number, slot: number): number[][] {
    const [map, setMap] = useState<number[][]>([]);
    useEffect(() => {
        const getMap = async () => {
            const parkingService = new ParkingService();
            const map = await parkingService.getLotMap(floor, slot);
            setMap(map ?? []);
        };
        getMap();
    }, [floor, slot]);
    return map;
}
