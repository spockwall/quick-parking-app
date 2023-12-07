import uuid from "react-uuid";
import { parkingSlots } from "../data/parkingSlots";
import { ParkingSpaceStatus } from "../types";

export class ParkingService {
  private computeParkingSpaceId(slot: number, floor: number, simpleId: number): string {
    return `${slot}-${floor}-${simpleId}`;
  }

  public getLotStatus(slot: number, floor: number): ParkingSpaceStatus[] {
    const results: ParkingSpaceStatus[] = [];
    for (let i = 1; i <= 25; i++) {
      // Fake data without backend
      const isOccupied = Math.floor(Math.random() * 100) % 3 === 0;
      const disabledOnly = Math.floor(Math.random() * 100) % 10 === 0;
      const data: ParkingSpaceStatus = {
        id: uuid().slice(0, 8),
        spaceId: this.computeParkingSpaceId(slot, floor, i),
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
  }

  public getLotMap = (slot: number, floor: number): number[][] | null => {
    if (slot in parkingSlots) {
      const parkingSlot = parkingSlots[slot as keyof typeof parkingSlots];
      if (floor in parkingSlot) {
        return parkingSlot[floor as keyof typeof parkingSlot];
      }
    }
    return null;
  };
}