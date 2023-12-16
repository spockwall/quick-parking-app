import { useEffect, useState } from "react";
import { GuardService } from "../services/guardService";
import type { DurationStatus } from "../types";

export default function useParkingSpaceDuration(floor: number, slot: number): DurationStatus[] {
    const [status, setStatus] = useState<DurationStatus[]>([]);
    useEffect(() => {
        const getStatus = async () => {
            const guardService = new GuardService();
            const rawData = await guardService.getDuration(floor, slot);
            if (rawData && 'message' in rawData) {
                delete rawData.message;
            }
            const status = Object.values(rawData)
                .filter(item => item.state === "occupied")
                .reduce((acc: DurationStatus[], current: DurationStatus) => {
                    const exist = acc.find(item => item.parkingSpaceId === current.parkingSpaceId);
                    if (exist) {
                        if (current.startTime > exist.startTime) {
                            acc = acc.filter(item => item.parkingSpaceId !== current.parkingSpaceId);
                            acc.push(current);
                        }
                    } else {
                        acc.push(current);
                    }
                    return acc;
                }, []);
            status.sort((a, b) => b.duration - a.duration);
            setStatus(status);
        };
        getStatus();
    }, [floor, slot]);
    return status;
}
