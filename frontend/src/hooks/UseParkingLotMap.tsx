import { useEffect, useState } from "react";
import { ParkingService } from "../services/parkingService";

export default function useParkingLotMap(floor: number, slot: number): number[][] {
  const [map, setMap] = useState<number[][]>([]);
  useEffect(() => {
    const parkingService = new ParkingService();
    const map = parkingService.getLotMap(floor, slot);
    setMap(map ?? []);
  }, [floor, slot]);
  return map;
}