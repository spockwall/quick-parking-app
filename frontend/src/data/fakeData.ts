import { parkingSpaceStatus } from "../types";
import uuid from "react-uuid";
export const RatioData = [
    {
        parkingSpaceId: "1-1-1",
        type: "general", // general | disabledOnly,
        usageRatio: 0.5,
    },
    {
        parkingSpaceId: "1-1-2",
        type: "general", // general | disabledOnly,
        usageRatio: 0.7,
    },
    {
        parkingSpaceId: "1-1-3",
        type: "general", // general | disabledOnly,
        usageRatio: 0.7,
    },
];
export const DurationData = [
    {
        parkingSpaceId: "1-1-1",
        state: "occupied", //available | occupied | error,
        type: "general", // general | disabledOnly,
        startTime: 1700000000,
        duration: 3600,
    },
    {
        parkingSpaceId: "1-1-2",
        state: "occupied", //available | occupied | error,
        type: "general", // general | disabledOnly,
        startTime: 1700000120,
        duration: 3600,
    },
];

export const UsageHistoryData = [
    { carId: "A1234567890", period: "11:00 AM - 8:00 PM" },
    { carId: "A1231231210", period: "11:00 AM - 8:00 PM" },
];
export const ParkingSpaceData = (slot: number, floor: number) => {
    const results: parkingSpaceStatus[] = [];
    for (let i = 1; i <= 25; i++) {
        // Fake data without backend
        const isOccupied = Math.floor(Math.random() * 100) % 3 === 0;
        const disabledOnly = Math.floor(Math.random() * 100) % 10 === 0;
        const data: parkingSpaceStatus = {
            id: uuid().slice(0, 8),
            spaceId: slot + "-" + floor + "-" + i,
            state: isOccupied ? "occupied" : "available",
            type: disabledOnly ? "disabledOnly" : "general",
            startTime: isOccupied ? Date.now() - 1000 * 60 * 60 * 2 : 0,
            occupant: isOccupied ? "qwe-1234" : "None",
            floor: floor,
            slot: slot,
        };
        results.push(data);
    }
    return results;
};
