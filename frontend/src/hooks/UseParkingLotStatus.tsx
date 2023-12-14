import { useEffect, useState } from "react";
import { ParkingService } from "../services/parkingService";
import type { parkingSpaceStatus } from "../types";

export default function useParkingLotStatus(floor: number, slot: number): parkingSpaceStatus[] {
    const [status, setStatus] = useState<parkingSpaceStatus[]>([]);
    useEffect(() => {
        const getStatus = async () => {
            const parkingService = new ParkingService();
            const status = await parkingService.getLotStatus(floor, slot);
            setStatus(status ?? []);
        };
        getStatus();
    }, [floor, slot]);
    return status;
}
