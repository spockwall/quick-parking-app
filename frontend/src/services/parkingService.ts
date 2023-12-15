import { parkingSlots } from "../data/parkingSlots";
import { parkingSpaceStatus, userParkingStatus } from "../types";

export class ParkingService {
    // private computeParkingSpaceId(slot: number, floor: number, simpleId: number): string {
    //     return `${slot}-${floor}-${simpleId}`;
    // }
    public async getStaffParkingStatus(userId: string): Promise<userParkingStatus> {
        // TODO - backend need query
        try {
            const res = await fetch(`/api/staff/parking_spaces/${userId}`, {
                method: "GET",
                credentials: "include",
            });
            return await res.json();
        } catch (err) {
            console.log(err);
            return {} as userParkingStatus;
        }
    }

    public async getLotStatus(slot: number, floor: number): Promise<parkingSpaceStatus[]> {
        // TODO - backend need query
        try {
            const res = await fetch(`/api/staff/parking_spaces?lot=${slot}&floor=${floor}&limit=25`, {
                method: "GET",
                credentials: "include",
            });
            return await res.json();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    public getLotMap = (slot: number, floor: number): number[][] | null => {
        // Get the 2D parking spaces
        if (slot in parkingSlots) {
            const parkingSlot = parkingSlots[slot as keyof typeof parkingSlots];
            if (floor in parkingSlot) {
                return parkingSlot[floor as keyof typeof parkingSlot];
            }
        }
        return null;
    };
}
