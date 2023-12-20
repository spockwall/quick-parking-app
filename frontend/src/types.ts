import { ROLE } from "./enums";

export type roleType = ROLE.STAFF | ROLE.GUARD | ROLE.ADMIN | "any";
export type statusType = "common" | "disability" | "difficulty";
export interface parkingSpaceStatus {
    id: string;
    spaceId: string;
    state: "available" | "occupied" | "error";
    status: statusType;
    startTime: number;
    occupant: string;
    floor: number;
    slot: number;
    type: "general" | "disabledOnly";
}
export interface userInfo {
    userId: string;
    name: string;
    phone: string;
    email: string;
    licensePlateNumbers: string[];
    role: ROLE;
    status: statusType;
    licensePlates?: string[]; // backend's fault
    password?: string;
}

export interface userParkingStatus {
    id: string;
    spaceId: string;
    userId: string;
    enterTime: number;
    licensePlateNumber: string;
}

export type authState = {
    token: string;
    role: roleType | "";
};

export type DurationStatus = {
    parkingSpaceId: string;
    state: "available" | "occupied" | "error";
    status: statusType;
    startTime: number;
    duration: number;
};

export type DurationUserInfo = {
    username: string;
    phone: string;
    email: string;
    licensePlateNumber: string;
};

export type RatioStatus = {
    parkingSpaceId: string;
    status: statusType;
    usageRatio: number;
};

export type OneWeekRatioInfo = {
    dates: string[];
    usageRatios: number[];
};

export type HistoryInfo = {
    carId: string;
    period: string;
};
