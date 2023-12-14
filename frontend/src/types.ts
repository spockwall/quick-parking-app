import { ROLE } from "./enums";
export interface ParkingSpaceStatus {
    id: string;
    spaceId: string;
    state: "available" | "occupied" | "error";
    type: "general" | "disabledOnly";
    startTime: number;
    occupant: string;
    floor: number;
    slot: number;
}
export interface userInfo {
    userId: string;
    name: string;
    phone: string;
    email: string;
    licensePlateNumber: string[];
    role: ROLE;
    status: "common" | "difficulty" | "disability";
}
export type authState = {
    token: string;
    role: roleType | "";
    user: userInfo;
};
export type roleType = ROLE.STAFF | ROLE.GUARD | ROLE.ADMIN;
