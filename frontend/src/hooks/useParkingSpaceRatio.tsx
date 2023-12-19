import { useEffect, useState } from "react";
import { GuardService } from "../services/guardService";
import type { RatioStatus } from "../types";

export default function useParkingSpaceRatio(floor: number, slot: number): RatioStatus[] {
    const [status, setStatus] = useState<RatioStatus[]>([]);
    useEffect(() => {
        const getStatus = async () => {
            const guardService = new GuardService();
            const rawData = await guardService.getVacancyRatio(floor, slot);
            if (rawData && 'message' in rawData) {
                delete rawData.message;
            }
            const status = Object.values(rawData);
            status.sort((a, b) => b.usageRatio - a.usageRatio);
            setStatus(status);
        };
        getStatus();
    }, [floor, slot]);
    return status;
}
