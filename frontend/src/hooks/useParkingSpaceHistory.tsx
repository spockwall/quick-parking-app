import { useEffect, useState } from "react";
import { GuardService } from "../services/guardService";
import type { HistoryInfo } from "../types";

export default function useParkingSpaceHistory(spaceId: string): HistoryInfo[] {
    const [status, setStatus] = useState<HistoryInfo[]>([]);
    useEffect(() => {
        const getStatus = async () => {
            const guardService = new GuardService();
            const status = await guardService.getHitory(spaceId);
            const NowTime = new Date();
            const NowTimeStr = String(NowTime.getFullYear()) + '-' + String(NowTime.getMonth()+1) + '-' + String(NowTime.getDate());
            const currentDate = new Date(NowTimeStr);
            if (status && Array.isArray(status)) {
                const filteredStatus = status
                    .filter(car => {
                        const [startTime, endTime] = car.period.split(' - ');
                        const startDateStr = startTime.split(' ')[2];
                        const startDate = new Date(startDateStr);
                        const endDate = endTime === 'Now' ? currentDate : new Date(endTime.split(' ')[2]);
                        return (
                            (startDate.getTime() <= currentDate.getTime() && endDate.getTime() == currentDate.getTime())
                        );
                    })
                    .map(car => {
                        const [startTime, endTime] = car.period.split(' - ');
                        const startDateStr = startTime.split(' ')[2];
                        const startDate = new Date(startDateStr);
                        const formattedPeriod = startDate.getTime() == currentDate.getTime() ? (startTime.split(' ')[0] + startTime.split(' ')[1]) : '00:00 AM';
                
                        return {
                            carId: car.carId,
                            period: formattedPeriod + ' - ' + (car.period.endsWith('Now') ? 'Now' : (endTime.split(' ')[0] + endTime.split(' ')[1])),
                        };
                    });
                setStatus(filteredStatus ?? []);
            }
        };

        getStatus();
    }, []);
    return status;
}
