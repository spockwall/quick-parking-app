import { State, Status } from "@prisma/client";

export interface QueryParams extends CommonQueryParams {
  state?: State;
  lot?: number;
  floor?: number;
  parkingSpaceId?: string;
  days?: string;
}

export interface CommonQueryParams {
  offset?: string;
  limit?: string;
  status?: Status;
}

export interface LoginParams {
  userId: string;
  password: string;
}
