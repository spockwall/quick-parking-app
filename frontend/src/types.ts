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
    id: string;
    name: string;
    phone: string;
    email: string;
    licensePlateNumber: string[];
    role: "staff" | "guard" | "admin";
    status: "common" | "difficulty" | "disability";
}
export type authState = {
    token: string;
    role: roleType | ""; 
};
export type roleType = "staff" | "guard" | "admin";
