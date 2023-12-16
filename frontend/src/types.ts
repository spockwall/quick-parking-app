import { ROLE } from "./enums";

export interface parkingSpaceStatus {
    id: string;
    spaceId: string;
    state: "available" | "occupied" | "error";
    status: "common" | "disability" | "difficulty";
    startTime: number;
    occupant: string;
    floor: number;
    lot: number;
}
export interface userInfo {
    userId: string;
    name: string;
    phone: string;
    email: string;
    licensePlateNumbers: string[];
    role: ROLE;
    status: "common" | "difficulty" | "disability";
}

export interface userParkingStatus {
    id: string;
    spaceId: string;
    userId: string;
    enterTime: number;
}

export type authState = {
    token: string;
    role: roleType | "";
    user: userInfo;
}

export type roleType = ROLE.STAFF | ROLE.GUARD | ROLE.ADMIN;

export type DurationStatus = {
    parkingSpaceId: string;
    state: "available" | "occupied" | "error";
    status: "common" | "disability" | "difficulty";
    startTime: number;
    duration: number;
}

export type DurationUserInfo = {
    username: string;
    phone: string;
    email: string;
    licensePlateNumber: string;
}

export type RatioStatus = {
    parkingSpaceId: string;
    status: "common" | "disability" | "difficulty";
    usageRatio: number;
}

export type OneWeekRatioInfo = {
    dates: string[];
    usageRatios: number[];
}