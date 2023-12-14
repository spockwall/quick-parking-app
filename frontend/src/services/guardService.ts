import { userInfo } from "../types";
export class GuardService {
    // TODO: This Service haven't been tested yet.
    // TODO: Need to define type for return value
    // GET /guard/parking_spaces/duration
    public async getDuration(): Promise<any[]> {
        try {
            const res = await fetch(`/api/guard/parking_spaces/duration`, {
                method: "GET",
                credentials: "include",
            });
            return await res.json();
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    // GET /guard/parking_spaces/vacancy
    public async getVacancyRatio(): Promise<any[]> {
        try {
            const res = await fetch(`/api/guard/parking_spaces/ratio`, {
                method: "GET",
                credentials: "include",
            });
            return await res.json();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    // GET /guard/parking_spaces/:parkingSpaceId
    public async getParkingSpaceUser(parkingSpaceId: string): Promise<userInfo> {
        try {
            const res = await fetch(`/api/guard/parking_spaces/${parkingSpaceId}`, {
                method: "GET",
                credentials: "include",
            });
            return await res.json();
        } catch (err) {
            console.log(err);
            return {} as userInfo;
        }
    }
}
