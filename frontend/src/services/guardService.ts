import { DurationUserInfo } from "../types";
import { DurationStatus, RatioStatus, OneWeekRatioInfo } from "../types";
export class GuardService {
    // TODO: This Service haven't been tested yet.
    // TODO: Need to define type for return value
    // GET /guards/parking_spaces/duration
    public async getDuration(floor: number, slot: number): Promise<DurationStatus[]> {
        try {
            const res = await fetch(`/api/guards/parking_spaces/duration?lot=${slot}&floor=${floor}&limit=25`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                throw new Error("Failed to fetch data");
            }
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    // GET /guards/parking_spaces/ratio
    public async getVacancyRatio(floor: number, slot: number): Promise<RatioStatus[]> {
        try {
            const res = await fetch(`/api/guards/parking_spaces/ratio?lot=${slot}&floor=${floor}&limit=25`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                throw new Error("Failed to fetch data");
            }
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    // GET /guards/parking_spaces/ratio/:spaceId
    public async getVacancyRatioOneWeek(spaceId: string): Promise<OneWeekRatioInfo | null> {
        try {
            const res = await fetch(`/api/guards/parking_spaces/ratio/${spaceId}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                throw new Error("Failed to fetch data");
            }
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // GET /guards/parking_spaces/:parkingSpaceId
    public async getParkingSpaceUser(parkingSpaceId: string): Promise<DurationUserInfo> {
        try {
            const res = await fetch(`/api/guards/parking_spaces/${parkingSpaceId}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                throw new Error("Failed to fetch data");
            }
            return data;
        } catch (err) {
            console.log(err);
            return {} as DurationUserInfo;
        }
    }
}
