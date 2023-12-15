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
};

export type roleType = ROLE.STAFF | ROLE.GUARD | ROLE.ADMIN;
