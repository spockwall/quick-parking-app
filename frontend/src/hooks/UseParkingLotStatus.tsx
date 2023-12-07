import { useEffect, useState } from "react";
import { ParkingService } from "../services/parkingService";
import type { ParkingSpaceStatus } from "../types";

export default function useParkingLotStatus(floor: number, slot: number): ParkingSpaceStatus[] {
  const [status, setStatus] = useState<ParkingSpaceStatus[]>([]);
  useEffect(() => {
    const parkingService = new ParkingService();
    const status = parkingService.getLotStatus(floor, slot);
    setStatus(status ?? []);
  }, [floor, slot]);
  return status;
}