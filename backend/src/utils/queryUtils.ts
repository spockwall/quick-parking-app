import { QueryParams } from "./params";

export const processQueryParams = (queryParams: Partial<QueryParams>) => {
  const { status, state, lot, floor } = queryParams;
  const whereCondition: {
    parkingSpace?: { [key: string]: any };
    [key: string]: any;
  } = {};

  const parkingSpaceWhereCondition: { [key: string]: any } = {};
  if (floor !== undefined) {
    parkingSpaceWhereCondition.floor = Number(floor);
  }
  if (lot !== undefined) {
    parkingSpaceWhereCondition.lot = Number(lot);
  }

  if (Object.keys(parkingSpaceWhereCondition).length > 0) {
    whereCondition.parkingSpace = parkingSpaceWhereCondition;
  }

  if (status) {
    whereCondition["parkingSpace.status"] = status;
  }
  if (state) {
    whereCondition["parkingSpace.state"] = state;
  }

  return whereCondition;
};
