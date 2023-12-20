import useParkingLotStatus from "./useParkingLotStatus";
import { useEffect, useState } from "react";

export default function useParkingLotVacancy(floor: number, slot: number): Record<string, number> {
    const statusList = useParkingLotStatus(floor, slot);

    const [counts, setCounts] = useState<Record<string, number>>({
        common: 0,
        disability: 0,
        difficulty: 0,
    });

    useEffect(() => {
        const filteredCounts = statusList.reduce(
            (acc, currentStatus) => {
                if (currentStatus?.state === "available") {
                    if (currentStatus?.status === "common") {
                        acc.common += 1;
                    } else if (currentStatus?.status === "disability") {
                        acc.disability += 1;
                    } else if (currentStatus?.status === "difficulty") {
                        acc.difficulty += 1;
                    }
                }
                return acc;
            },
            { common: 0, disability: 0, difficulty: 0 }
        );

        setCounts(filteredCounts);
    }, [statusList]);

    return counts;
}
