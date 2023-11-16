import { State, Status } from "@prisma/client";

export interface QueryParams extends CommonQueryParams {
  state?: State;
  slot?: number;
  floor?: number;
  parkingSpaceId?: string;
}

export interface CommonQueryParams {
  offset?: string;
  limit?: string;
  status?: Status;
}

export interface LoginParams {
  id: string;
  password: string;
}
