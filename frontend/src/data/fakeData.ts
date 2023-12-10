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